import { memo } from "react";
import { Card } from "@/components/ui/card";

interface Step6Props {
    formData: any;
}

const Step6Review = ({ formData }: Step6Props) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                    Bước 6: Xem lại thông tin của bạn
                </h2>
                <p className="text-muted-foreground mb-8">
                    Vui lòng kiểm tra lại thông tin và hoàn thiện các phần còn lại trước khi gửi
                </p>

                <div className="space-y-6">
                    <Card className="glass-card rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4 text-primary">
                            PHẦN A: THÔNG TIN ĐỊNH DANH
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Họ và tên:</span>
                                <p className="font-medium">{formData.step1.fullName}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Đơn vị:</span>
                                <p className="font-medium">{formData.step1.department}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Phòng ban:</span>
                                <p className="font-medium">{formData.step1.unit}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Vị trí:</span>
                                <p className="font-medium">{formData.step1.position}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Số năm kinh nghiệm:</span>
                                <p className="font-medium">{formData.step1.yearsExperience} năm</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Bậc học:</span>
                                <p className="font-medium capitalize">{formData.step1.degree}</p>
                            </div>
                            <div className="md:col-span-2">
                                <span className="text-muted-foreground">Chuyên ngành:</span>
                                <p className="font-medium">{formData.step1.major}</p>
                            </div>
                            <div className="md:col-span-2">
                                <span className="text-muted-foreground">Từ khóa chuyên sâu:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {formData.step1.keywords.map((keyword: string, i: number) => (
                                        <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4 text-secondary">
                            PHẦN B: ĐÁNH GIÁ NĂNG LỰC
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="text-muted-foreground">Năng lực Nền tảng:</span>
                                <span className="font-medium ml-2">
                                    Đã đánh giá {Object.keys(formData.step2).length} năng lực
                                </span>
                            </p>
                            <p>
                                <span className="text-muted-foreground">Năng lực Chuyên môn:</span>
                                <span className="font-medium ml-2">
                                    Đã đánh giá {Object.keys(formData.step3).length} năng lực
                                </span>
                            </p>
                        </div>
                    </Card>

                    <Card className="glass-card rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4 text-accent">
                            PHẦN C: ĐỊNH HƯỚNG ĐÀO TẠO
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="text-muted-foreground font-semibold">C1 - Ưu tiên nền tảng:</span>
                                <p className="font-medium">
                                    {Object.keys(formData.step4.foundationPriorities).length} năng lực đã đánh giá
                                </p>
                            </div>
                            <div>
                                <span className="text-muted-foreground font-semibold">C3 - Ưu tiên chuyên môn:</span>
                                <p className="font-medium">
                                    {Object.keys(formData.step4.professionalPriorities).length} năng lực đã đánh giá
                                </p>
                            </div>

                            {formData.step4.otherFoundation && (
                                <div className="pt-2 border-t border-border/30">
                                    <span className="text-muted-foreground font-semibold">C2 - Năng lực nền tảng khác:</span>
                                    <p className="font-medium mt-1 whitespace-pre-wrap">{formData.step4.otherFoundation}</p>
                                </div>
                            )}

                            {formData.step4.otherProfessional && (
                                <div className="pt-2 border-t border-border/30">
                                    <span className="text-muted-foreground font-semibold">C4 - Năng lực chuyên môn khác:</span>
                                    <p className="font-medium mt-1 whitespace-pre-wrap">{formData.step4.otherProfessional}</p>
                                </div>
                            )}

                            {formData.step4.challenges && (
                                <div className="pt-2 border-t border-border/30">
                                    <span className="text-muted-foreground font-semibold">C5 - Khó khăn hiện tại:</span>
                                    <p className="font-medium mt-1 whitespace-pre-wrap">{formData.step4.challenges}</p>
                                </div>
                            )}

                            {formData.step4.suggestions && (
                                <div className="pt-2 border-t border-border/30">
                                    <span className="text-muted-foreground font-semibold">C6 - Đề xuất chương trình đào tạo:</span>
                                    <p className="font-medium mt-1 whitespace-pre-wrap">{formData.step4.suggestions}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step6Review);

