import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TrainingPriorityTable from "./TrainingPriorityTable";
import { useCallback, memo } from "react";

interface Step4Data {
    foundationPriorities: Record<string, string>;
    otherFoundation: string;
    professionalPriorities: Record<string, string>;
    otherProfessional: string;
    challenges: string;
    suggestions: string;
}

interface Step4Props {
    data: Step4Data;
    onChange: (data: Partial<Step4Data>) => void;
}

// Định nghĩa arrays bên ngoài component để tránh re-create mỗi lần render
const FOUNDATION_ITEMS = [
    "Phương pháp luận NCKH",
    "Xây dựng đề cương NCKH",
    "Phương pháp phân tích số liệu khoa học",
    "Công bố khoa học và sở hữu trí tuệ",
    "Năng lực Sáng tạo & Phát triển Ý tưởng",
    "Hoạch định Chiến lược R&D",
    "Quản lý Danh mục Dự án",
    "Quản lý và triển khai dự án nghiên cứu",
    "Hệ thống hóa thông tin khoa học",
    "Áp dụng AI trong hoạt động nghiên cứu khoa học và chuyển đổi số",
];

const PROFESSIONAL_ITEMS = [
    "Phân tích Thị trường & Xu hướng sản phẩm",
    "Nghiên cứu Y học Cổ truyền và y học dân tộc",
    "Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao",
    "Tiêu chuẩn hóa & đảm bảo chất lượng dược liệu",
    "Tối ưu hóa chiết xuất tạo cao định chuẩn",
    "Công nghệ Sinh học Dược liệu",
    "Xây dựng công thức sản phẩm TPCN, mỹ phẩm, thuốc dược liệu",
    "R&D sản phẩm mới",
    "Công nghệ Bào chế Nâng cao",
    "Nghiên cứu tin sinh học - in silico",
    "Đánh giá tác dụng sinh học (in vitro, in vivo)",
    "Thiết kế & Quản lý Thử nghiệm Lâm sàng",
    "Nghiên cứu sinh khả dụng & tương đương sinh học",
    "Pháp chế & Đăng ký",
    "Pháp chế Quốc tế",
    "Kiến thức về Công nghệ & dây chuyền sản xuất dược - mỹ phẩm",
    "Vận hành máy móc thiết bị sản xuất",
    "Chuyển giao Công nghệ",
    "Cảnh giác Dược/Mỹ phẩm",
    "Hỗ trợ Kỹ thuật & Y khoa (Medical Affairs)",
];

const Step4Training = ({ data, onChange }: Step4Props) => {
    // Memoize callback functions để tránh re-render không cần thiết
    const handleFoundationChange = useCallback((index: number, value: string) => {
        const newPriorities = { ...data.foundationPriorities };
        newPriorities[index] = value;
        onChange({ foundationPriorities: newPriorities });
    }, [data.foundationPriorities, onChange]);

    const handleProfessionalChange = useCallback((index: number, value: string) => {
        const newPriorities = { ...data.professionalPriorities };
        newPriorities[index] = value;
        onChange({ professionalPriorities: newPriorities });
    }, [data.professionalPriorities, onChange]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                    PHẦN C: ĐỊNH HƯỚNG PHÁT TRIỂN CÁ NHÂN
                </h2>
                <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-foreground">
                        📌 Lưu ý: Các mục có dấu <span className="text-destructive">*</span> là bắt buộc phải điền
                    </p>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            C1. Bảng nhu cầu đào tạo NĂNG LỰC NỀN TẢNG <span className="text-destructive">*</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Vui lòng chọn mức độ ưu tiên cho từng năng lực bên dưới
                        </p>
                        <TrainingPriorityTable
                            title="1. Năng lực Nền tảng"
                            items={FOUNDATION_ITEMS}
                            values={data.foundationPriorities}
                            onChange={handleFoundationChange}
                            limitHighPriority={true}
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            C2. Bảng nhu cầu đào tạo NĂNG LỰC CHUYÊN MÔN <span className="text-destructive">*</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Vui lòng chọn mức độ ưu tiên cho từng năng lực bên dưới
                        </p>
                        <TrainingPriorityTable
                            title="2. Năng lực Chuyên môn"
                            items={PROFESSIONAL_ITEMS}
                            values={data.professionalPriorities}
                            onChange={handleProfessionalChange}
                            limitHighPriority={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step4Training);
