import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useState, useCallback, memo } from "react";

interface Step1Data {
  email: string;
  phone: string;
  fullName: string;
  department: string;
  unit: string;
  position: string;
  yearsExperience: string;
  degree: string;
  otherDegree?: string;
  major: string;
  keywords: string[];
  notableProjects: string;
}

interface Step1Props {
  data: Step1Data;
  onChange: (data: Partial<Step1Data>) => void;
}

const Step1BasicInfo = ({ data, onChange }: Step1Props) => {
  const [keywordInput, setKeywordInput] = useState("");

  // Sử dụng useCallback để tránh re-create function mỗi lần render
  const handleAddKeyword = useCallback((e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;
    if (e) e.preventDefault();
    
    if (keywordInput.trim() && data.keywords.length < 5) {
      onChange({ keywords: [...data.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  }, [keywordInput, data.keywords, onChange]);

  const handleAddKeywordClick = useCallback(() => {
    handleAddKeyword();
  }, [handleAddKeyword]);

  const handleRemoveKeyword = useCallback((index: number) => {
    onChange({ keywords: data.keywords.filter((_, i) => i !== index) });
  }, [data.keywords, onChange]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
          Phiếu Khảo Sát: Hồ Sơ Năng lực R&D Cá nhân
        </h2>
        <p className="text-lg font-semibold text-foreground/80 mb-6">
          PHẦN A: THÔNG TIN ĐỊNH DANH, HỌC VẤN VÀ DỰ ÁN NỔI BẬT
        </p>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email liên hệ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="example@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Số điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="0123456789"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">
                Đơn vị <span className="text-destructive">*</span>
              </Label>
              <Input
                id="department"
                value={data.department}
                onChange={(e) => onChange({ department: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="Nhập đơn vị"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-sm font-medium">
                Phòng ban <span className="text-destructive">*</span>
              </Label>
              <Input
                id="unit"
                value={data.unit}
                onChange={(e) => onChange({ unit: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="Nhập phòng ban"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                Vị trí công tác <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                value={data.position}
                onChange={(e) => onChange({ position: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="Nhập vị trí"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsExperience" className="text-sm font-medium">
                Số năm kinh nghiệm R&D <span className="text-destructive">*</span>
              </Label>
              <Input
                id="yearsExperience"
                type="number"
                min="0"
                value={data.yearsExperience}
                onChange={(e) => onChange({ yearsExperience: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
                placeholder="Nhập số năm"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Bậc học <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={data.degree}
              onValueChange={(value) => onChange({ degree: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 glass-card rounded-lg p-3 transition-colors hover:bg-muted/30">
                <RadioGroupItem value="phd" id="phd" />
                <Label htmlFor="phd" className="cursor-pointer flex-1 font-normal">
                  Tiến sĩ (PhD)
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass-card rounded-lg p-3 transition-colors hover:bg-muted/30">
                <RadioGroupItem value="master" id="master" />
                <Label htmlFor="master" className="cursor-pointer flex-1 font-normal">
                  Thạc sĩ (Master)
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass-card rounded-lg p-3 transition-colors hover:bg-muted/30">
                <RadioGroupItem value="bachelor" id="bachelor" />
                <Label htmlFor="bachelor" className="cursor-pointer flex-1 font-normal">
                  Đại học (Bachelor)
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass-card rounded-lg p-3 transition-colors hover:bg-muted/30">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer flex-1 font-normal">
                  Mục khác
                </Label>
              </div>
            </RadioGroup>
            {data.degree === "other" && (
              <Input
                value={data.otherDegree || ""}
                onChange={(e) => onChange({ otherDegree: e.target.value })}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200 mt-3"
                placeholder="Vui lòng ghi rõ"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="major" className="text-sm font-medium">
              Chuyên ngành <span className="text-destructive">*</span>
            </Label>
            <Input
              id="major"
              value={data.major}
              onChange={(e) => onChange({ major: e.target.value })}
              className="glass-card border-border/50 focus:border-primary transition-colors duration-200"
              placeholder="Nhập chuyên ngành"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-sm font-medium">
              Từ khóa chuyên sâu <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              Cung cấp 1-5 từ khóa mô tả hẹp về chuyên môn sâu (Hãy nhớ click nút "Thêm" để thêm từ khóa)
            </p>
            <div className="flex gap-2">
              <Input
                id="keywords"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleAddKeyword}
                className="glass-card border-border/50 focus:border-primary transition-colors duration-200 flex-1"
                placeholder="Nhập từ khóa"
                disabled={data.keywords.length >= 5}
              />
              <Button
                type="button"
                onClick={handleAddKeywordClick}
                disabled={!keywordInput.trim() || data.keywords.length >= 5}
                className="px-4"
              >
                <Plus className="h-4 w-4 mr-1" />
                Thêm
              </Button>
            </div>
            {data.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {data.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium transition-colors hover:bg-primary/20"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(index)}
                      className="hover:text-destructive transition-colors"
                      aria-label={`Xóa từ khóa ${keyword}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notableProjects" className="text-sm font-medium">
              Các dự án R&D nổi bật đã tham gia <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              Liệt kê 2-3 dự án chính
            </p>
            <Textarea
              id="notableProjects"
              value={data.notableProjects}
              onChange={(e) => onChange({ notableProjects: e.target.value })}
              className="glass-card border-border/50 focus:border-primary transition-colors duration-200 min-h-[120px]"
              placeholder="Mô tả các dự án R&D nổi bật..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step1BasicInfo);
