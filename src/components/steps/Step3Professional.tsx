import { memo } from "react";
import CompetencyRating from "./CompetencyRating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Step3Data {
  market1: number;
  source1: number;
  source2: number;
  source3: number;
  source4: number;
  source5: number;
  formula1: number;
  formula2: number;
  formula3: number;
  preclinical1: number;
  preclinical2: number;
  clinical1: number;
  clinical2: number;
  regulatory1: number;
  regulatory2: number;
  transfer1: number;
  transfer2: number;
  postmarket1: number;
  postmarket2: number;
}

interface Step3Props {
  data: Step3Data;
  onChange: (data: Partial<Step3Data>) => void;
}

const Step3Professional = ({ data, onChange }: Step3Props) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
          2. Năng lực CHUYÊN MÔN
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

        <Accordion type="multiple" className="space-y-4" defaultValue={["item-1"]}>
          <AccordionItem value="item-1" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-primary">2.1. Nghiên cứu Thị trường</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4">
              <CompetencyRating
                label="2.1.1. Năng lực Phân tích Thị trường & Xu hướng sản phẩm"
                description="Khả năng phân tích dữ liệu thị trường, nhận diện nhu cầu chưa được đáp ứng, và dự báo xu hướng ngành."
                value={data.market1}
                onChange={(value) => onChange({ market1: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-secondary">2.2. Nghiên cứu tạo nguồn & Khám phá nguyên liệu</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.2.1. Năng lực Nghiên cứu Y học Cổ truyền"
                description="Khả năng tra cứu, phân tích và kế thừa các bài thuốc, kinh nghiệm dân gian và tài liệu y văn cổ."
                value={data.source1}
                onChange={(value) => onChange({ source1: value })}
              />
              <CompetencyRating
                label="2.2.2. Tạo vùng trồng tiêu chuẩn GACP cây dược liệu chất lượng cao"
                description="Triển khai và quản lý vùng trồng dược liệu theo tiêu chuẩn Thực hành tốt trồng trọt và thu hái dược liệu - GACP."
                value={data.source2}
                onChange={(value) => onChange({ source2: value })}
              />
              <CompetencyRating
                label="2.2.3. Tiêu chuẩn hóa và đảm bảo chất lượng dược liệu"
                description="Xây dựng bộ tiêu chuẩn kỹ thuật, phương pháp kiểm nghiệm và quy trình kiểm soát để đảm bảo dược liệu đầu vào đồng nhất, an toàn. Phân lập các chất trong dược liệu để làm chất chuẩn."
                value={data.source3}
                onChange={(value) => onChange({ source3: value })}
              />
              <CompetencyRating
                label="2.2.4. Tối ưu hóa chiết xuất tạo cao định chuẩn"
                description="Nghiên cứu (dung môi, nhiệt độ, thời gian) để xây dựng quy trình chiết xuất hiệu suất cao và ổn định. Xây dựng tiêu chuẩn và phương pháp kiểm nghiệm cho nguyên liệu đầu vào và bán thành phẩm (cao) là hỗn hợp phức tạp."
                value={data.source4}
                onChange={(value) => onChange({ source4: value })}
              />
              <CompetencyRating
                label="2.2.5. Năng lực Công nghệ Sinh học Dược liệu (Biotechnology)"
                description="Nuôi cấy mô, tế bào thực vật để sản xuất hoạt chất quý hiếm hoặc nhân giống quy mô lớn."
                value={data.source5}
                onChange={(value) => onChange({ source5: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-accent">2.3. Nghiên cứu phát triển Công thức</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.3.1. Xây dựng công thức sản phẩm"
                description="Phối hợp các thành phần hoạt chất, tá dược để tạo ra công thức tối ưu, ổn định và đáp ứng mục tiêu sản phẩm."
                value={data.formula1}
                onChange={(value) => onChange({ formula1: value })}
              />
              <CompetencyRating
                label="2.3.2. R&D sản phẩm mới (Triển khai và quản lý dự án R&D cho sản phẩm cụ thể)"
                description="Quản lý vòng đời R&D của một sản phẩm, từ ý tưởng, nghiên cứu, thử nghiệm đến khi chuyển giao sản xuất."
                value={data.formula2}
                onChange={(value) => onChange({ formula2: value })}
              />
              <CompetencyRating
                label="2.3.3. Năng lực Công nghệ Bào chế Nâng cao"
                description="Chuyên môn về các hệ phân phối hoạt chất tiên tiến như nano, liposome, vi nhũ tương để tăng hiệu quả sản phẩm."
                value={data.formula3}
                onChange={(value) => onChange({ formula3: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-primary">2.4. Thử nghiệm Tiền lâm sàng</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.4.1. Nghiên cứu tin sinh học - in silico"
                description="Nắm được nguyên lý và sử dụng được các công cụ Tin sinh học, in silico trong việc phân tích, dự đoán tác dụng sinh học tiềm năng của hoạt chất."
                value={data.preclinical1}
                onChange={(value) => onChange({ preclinical1: value })}
              />
              <CompetencyRating
                label="2.4.2. Đánh giá tác dụng sinh học của dược liệu (in vitro, in vivo)"
                description="Thực hiện các thử nghiệm trong ống nghiệm (tế bào) và trên động vật để chứng minh hiệu quả sơ bộ."
                value={data.preclinical2}
                onChange={(value) => onChange({ preclinical2: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-secondary">2.5. Nghiên cứu Lâm sàng (Clinical)</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.5.1. Năng lực Thiết kế & Quản lý Thử nghiệm Lâm sàng Thuốc Thảo dược/TPCN/mỹ phẩm"
                description="Lên đề cương, triển khai, giám sát (monitoring) và quản lý dữ liệu thử nghiệm theo GCP."
                value={data.clinical1}
                onChange={(value) => onChange({ clinical1: value })}
              />
              <CompetencyRating
                label="2.5.2. Kiến thức về nghiên cứu sinh khả dụng và tương đương sinh học (BA/BE)"
                description="Hiểu rõ nguyên tắc, phương pháp đánh giá tốc độ và mức độ hấp thu hoạt chất vào cơ thể."
                value={data.clinical2}
                onChange={(value) => onChange({ clinical2: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-accent">2.6. Đăng ký & Pháp chế</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.6.1. Năng lực Pháp chế & Đăng ký (Regulatory Affairs – RA)"
                description="Biên soạn hồ sơ đăng ký (ACTD, ICH...) và hồ sơ đăng ký thuốc cổ truyền/thuốc dược liệu/TPCN/Mỹ phẩm."
                value={data.regulatory1}
                onChange={(value) => onChange({ regulatory1: value })}
              />
              <CompetencyRating
                label="2.6.2. Năng lực Pháp chế Quốc tế (International RA)"
                description="Biên soạn hồ sơ đăng ký sản phẩm tại các thị trường khác (ASEAN, FDA, EMA...)."
                value={data.regulatory2}
                onChange={(value) => onChange({ regulatory2: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-primary">2.7. Chuyển giao sản xuất & Thương mại hóa</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.7.1. Năng lực Chuyển giao Công nghệ"
                description="Chuyển giao quy trình từ quy mô R&D (lab-scale) lên quy mô sản xuất (pilot/commercial scale), bao gồm thẩm định quy trình."
                value={data.transfer1}
                onChange={(value) => onChange({ transfer1: value })}
              />
              <CompetencyRating
                label="2.7.2. Vận hành máy móc thiết bị sản xuất"
                description="Có khả năng thiết lập, sử dụng và bảo trì cơ bản các thiết bị trong dây chuyền sản xuất dược/mỹ phẩm."
                value={data.transfer2}
                onChange={(value) => onChange({ transfer2: value })}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="glass-card rounded-xl border-none">
            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
              <span className="text-lg font-bold text-secondary">2.8. Giám sát sau khi đưa sản phẩm ra thị trường</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 md:px-6 pb-4 space-y-1">
              <CompetencyRating
                label="2.8.1. Năng lực Cảnh giác Dược/Mỹ phẩm"
                description="Theo dõi, thu thập và báo cáo các phản ứng có hại (ADR) hoặc biến cố bất lợi (AE) sau khi sản phẩm ra thị trường."
                value={data.postmarket1}
                onChange={(value) => onChange({ postmarket1: value })}
              />
              <CompetencyRating
                label="2.8.2. Năng lực Hỗ trợ Kỹ thuật & Y khoa (Medical Affairs)"
                description="Hỗ trợ chuyên môn cho Marketing, Sales, các chuyên gia (KOLs) và giải đáp các thắc mắc khoa học về sản phẩm."
                value={data.postmarket2}
                onChange={(value) => onChange({ postmarket2: value })}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(Step3Professional);
