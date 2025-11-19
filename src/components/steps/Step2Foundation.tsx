import { memo } from "react";
import CompetencyRating from "./CompetencyRating";

interface Step2Data {
  methodology1: number;
  methodology2: number;
  methodology3: number;
  methodology4: number;
  creativity1: number;
  creativity2: number;
  creativity3: number;
  creativity4: number;
  tools1: number;
  tools2: number;
}

interface Step2Props {
  data: Step2Data;
  onChange: (data: Partial<Step2Data>) => void;
}

const Step2Foundation = ({ data, onChange }: Step2Props) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
          1. Năng lực NỀN TẢNG
        </h2>
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-5 mb-6 border border-border/50">
          <p className="text-sm font-bold mb-3 text-foreground">Thang điểm đánh giá năng lực:</p>
          <div className="space-y-2">
            {[
              { level: "0", title: "Chưa có kiến thức/Kỹ năng", desc: "Chưa được đào tạo hoặc tiếp xúc với năng lực này" },
              { level: "1", title: "Cơ bản (Basic)", desc: "Hiểu biết lý thuyết, cần hướng dẫn khi thực hiện" },
              { level: "2", title: "Áp dụng (Applied)", desc: "Có thể thực hiện độc lập các tác vụ thông thường" },
              { level: "3", title: "Thành thạo (Proficient)", desc: "Thực hiện tốt, có kinh nghiệm xử lý vấn đề phát sinh" },
              { level: "4", title: "Chuyên gia (Expert)", desc: "Có kiến thức sâu rộng, có thể hướng dẫn người khác" },
            ].map((item) => (
              <div key={item.level} className="flex gap-2 text-xs">
                <span className="font-bold text-primary min-w-[15px]">{item.level}:</span>
                <div>
                  <span className="font-semibold text-foreground">{item.title}</span>
                  <span className="text-muted-foreground"> - {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4 text-primary">
              1.1. Nhóm Năng lực Phương pháp luận & Thực thi Nghiên cứu
            </h3>
            <div className="space-y-1">
              <CompetencyRating
                label="1.1.1. Phương pháp luận nghiên cứu khoa học"
                description="Nắm vững và áp dụng các nguyên tắc, quy trình chuẩn để thực hiện một nghiên cứu khoa học."
                value={data.methodology1}
                onChange={(value) => onChange({ methodology1: value })}
              />
              <CompetencyRating
                label="1.1.2. Xây dựng đề cương nghiên cứu khoa học"
                description="Lập kế hoạch chi tiết cho một nghiên cứu, bao gồm mục tiêu, đối tượng, phương pháp và dự trù kinh phí."
                value={data.methodology2}
                onChange={(value) => onChange({ methodology2: value })}
              />
              <CompetencyRating
                label="1.1.3. Phương pháp phân tích số liệu khoa học"
                description="Sử dụng các công cụ và kỹ thuật thống kê, toán học để xử lý và diễn giải dữ liệu nghiên cứu."
                value={data.methodology3}
                onChange={(value) => onChange({ methodology3: value })}
              />
              <CompetencyRating
                label="1.1.4. Công bố khoa học và sở hữu trí tuệ"
                description="Viết bài báo khoa học, trình bày kết quả và thực hiện các thủ tục đăng ký bằng sáng chế, giải pháp hữu ích."
                value={data.methodology4}
                onChange={(value) => onChange({ methodology4: value })}
              />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4 text-secondary">
              1.2. Năng lực Sáng tạo & Phát triển Ý tưởng / Quản lý R&D
            </h3>
            <div className="space-y-1">
              <CompetencyRating
                label="1.2.1. Năng lực Sáng tạo & Phát triển Ý tưởng"
                description="Năng lực phát triển các ý tưởng sản phẩm mới có tính đột phá và khả thi."
                value={data.creativity1}
                onChange={(value) => onChange({ creativity1: value })}
              />
              <CompetencyRating
                label="1.2.2. Năng lực Hoạch định Chiến lược R&D"
                description="Khả năng xây dựng Hồ sơ Sản phẩm Mục tiêu - Target Product Profile, xác định lộ trình R&D, và định vị sản phẩm."
                value={data.creativity2}
                onChange={(value) => onChange({ creativity2: value })}
              />
              <CompetencyRating
                label="1.2.3. Quản lý và triển khai dự án nghiên cứu"
                description="Lập kế hoạch, tổ chức, theo dõi và kiểm soát tiến độ, nguồn lực và rủi ro của dự án R&D."
                value={data.creativity3}
                onChange={(value) => onChange({ creativity3: value })}
              />
              <CompetencyRating
                label="1.2.4. Năng lực Quản lý Danh mục Dự án"
                description="Lựa chọn, ưu tiên và quản lý cân bằng các dự án R&D để tối ưu hóa nguồn lực và phù hợp với chiến lược kinh doanh."
                value={data.creativity4}
                onChange={(value) => onChange({ creativity4: value })}
              />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4 text-accent">
              1.3. Nhóm Năng lực Công cụ & Chuyển đổi số
            </h3>
            <div className="space-y-1">
              <CompetencyRating
                label="1.3.1. Hệ thống hóa thông tin khoa học"
                description="Thu thập, sắp xếp, lưu trữ và tra cứu thông tin, phân tích và tài liệu khoa học một cách logic và hiệu quả."
                value={data.tools1}
                onChange={(value) => onChange({ tools1: value })}
              />
              <CompetencyRating
                label="1.3.2. Áp dụng AI trong hoạt động nghiên cứu khoa học và chuyển đổi số"
                description="Tích hợp các công nghệ trí tuệ nhân tạo để tự động hóa, tối ưu hóa quy trình và khám phá tri thức mới từ dữ liệu."
                value={data.tools2}
                onChange={(value) => onChange({ tools2: value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step2Foundation);
