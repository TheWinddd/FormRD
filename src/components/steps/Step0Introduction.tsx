import { memo } from "react";
import { FileText, Target, BookOpen } from "lucide-react";

const Step0Introduction = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Phiếu Khảo Sát
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground/90">
            Hồ Sơ Năng lực R&D Cá nhân
          </h2>
        </div>

        <div className="space-y-6">
          {/* Mục đích */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary">Mục đích</h3>
                <p className="text-base leading-relaxed text-foreground/90">
                  Biểu mẫu này nhằm mục đích khảo sát, ghi nhận và xây dựng một <strong>"Hồ sơ Năng lực R&D"</strong> cho từng cá nhân trong Ban R&D. 
                  Thông tin này sẽ là cơ sở quan trọng để công ty hiểu rõ thế mạnh của đội ngũ, 
                  xây dựng kế hoạch đào tạo, phát triển và phân bổ nguồn lực cho các dự án một cách hiệu quả nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Hướng dẫn */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-secondary">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-secondary">Hướng dẫn</h3>
                <p className="text-base leading-relaxed text-foreground/90">
                  Vui lòng điền đầy đủ các thông tin dưới đây. 
                  Đối với phần đánh giá năng lực, hãy tự đánh giá một cách khách quan nhất 
                  dựa trên kinh nghiệm và kiến thức thực tế của bạn.
                </p>
              </div>
            </div>
          </div>

          {/* Thang đánh giá */}
          <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="text-xl font-bold mb-4 text-center">Thang Đánh Giá Năng Lực</h3>
            <div className="space-y-3">
              {[
                { 
                  level: "0", 
                  title: "Chưa có kiến thức/Kỹ năng", 
                  desc: "Chưa được đào tạo hoặc tiếp xúc với năng lực này.",
                  color: "border-muted"
                },
                { 
                  level: "1", 
                  title: "Cơ bản (Basic)", 
                  desc: "Hiểu biết lý thuyết, cần hướng dẫn khi thực hiện.",
                  color: "border-blue-400"
                },
                { 
                  level: "2", 
                  title: "Áp dụng (Applied)", 
                  desc: "Có thể thực hiện độc lập các tác vụ thông thường.",
                  color: "border-green-400"
                },
                { 
                  level: "3", 
                  title: "Thành thạo (Proficient)", 
                  desc: "Thực hiện tốt, có kinh nghiệm xử lý vấn đề phát sinh.",
                  color: "border-orange-400"
                },
                { 
                  level: "4", 
                  title: "Chuyên gia (Expert)", 
                  desc: "Có kiến thức sâu rộng, có thể hướng dẫn người khác.",
                  color: "border-red-400"
                },
              ].map((item) => (
                <div 
                  key={item.level} 
                  className={`glass-card rounded-lg p-4 border-l-4 ${item.color} hover:bg-muted/30 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {item.level}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-foreground/80">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note quan trọng */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-foreground/90 text-center">
              💡 <strong>Lưu ý:</strong> Hãy dành khoảng 15-20 phút để hoàn thành phiếu khảo sát này một cách cẩn thận và chính xác nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Step0Introduction);

