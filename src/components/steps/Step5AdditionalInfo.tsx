import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Step5Data {
    otherFoundation: string;
    otherProfessional: string;
    challenges: string;
    suggestions: string;
}

interface Step5Props {
    data: Step5Data;
    onChange: (data: Partial<Step5Data>) => void;
}

const Step5AdditionalInfo = ({ data, onChange }: Step5Props) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                    Bước 5: Thông tin bổ sung
                </h2>
                <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-foreground">
                        📌 Lưu ý: Các mục có dấu <span className="text-destructive">*</span> là bắt buộc phải điền
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-xl p-4 md:p-6">
                        <Label htmlFor="otherFoundation" className="text-sm font-medium mb-2 block">
                            C3. Hãy liệt kê một vài Năng lực NỀN TẢNG khác mà bạn mong muốn được đào tạo (nếu có)
                        </Label>
                        <Textarea
                            id="otherFoundation"
                            value={data.otherFoundation}
                            onChange={(e) => onChange({ otherFoundation: e.target.value })}
                            className="glass-card border-border/50 focus:border-primary transition-colors duration-200 min-h-[100px]"
                            placeholder="Liệt kê các năng lực nền tảng khác..."
                        />
                    </div>

                    <div className="glass-card rounded-xl p-4 md:p-6">
                        <Label htmlFor="otherProfessional" className="text-sm font-medium mb-2 block">
                            C4. Hãy liệt kê một vài Năng lực CHUYÊN MÔN khác mà bạn mong muốn được đào tạo (nếu có)
                        </Label>
                        <Textarea
                            id="otherProfessional"
                            value={data.otherProfessional}
                            onChange={(e) => onChange({ otherProfessional: e.target.value })}
                            className="glass-card border-border/50 focus:border-primary transition-colors duration-200 min-h-[100px]"
                            placeholder="Liệt kê các năng lực chuyên môn khác..."
                        />
                    </div>

                    <div className="glass-card rounded-xl p-4 md:p-6">
                        <Label htmlFor="challenges" className="text-sm font-medium mb-2 block">
                            C5. Khó khăn bạn đang gặp phải trong quá trình làm R&D hiện nay là gì? Bạn cần Ban R&D có hỗ trợ cụ thể gì để giải quyết khó khăn này? <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="challenges"
                            value={data.challenges}
                            onChange={(e) => onChange({ challenges: e.target.value })}
                            className="glass-card border-border/50 focus:border-primary transition-colors duration-200 min-h-[150px]"
                            placeholder="Mô tả khó khăn và hỗ trợ cần thiết..."
                            required
                        />
                    </div>

                    <div className="glass-card rounded-xl p-4 md:p-6">
                        <Label htmlFor="suggestions" className="text-sm font-medium mb-2 block">
                            C6. Bạn có đề xuất cụ thể gì về chương trình workshop/ khóa đào tạo/ hoạt động coaching/ hoạt động mentor ...để giúp bạn phát triển các năng lực trên? <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="suggestions"
                            value={data.suggestions}
                            onChange={(e) => onChange({ suggestions: e.target.value })}
                            className="glass-card border-border/50 focus:border-primary transition-colors duration-200 min-h-[150px]"
                            placeholder="Đề xuất về các chương trình đào tạo..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step5AdditionalInfo);

