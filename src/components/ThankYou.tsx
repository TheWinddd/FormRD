import { memo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ThankYouProps {
  onReset: () => void;
}

const ThankYou = ({ onReset }: ThankYouProps) => {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Sau 7 giây, chuyển từ trạng thái "đang tạo" sang "hoàn tất"
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // POPUP 1: ĐANG TẠO PROFILE (7 giây đầu)
  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-scale-in">
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-500/10 p-6 relative">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Đang xử lý...
          </h1>
          
          <p className="text-xl text-foreground/80 mb-6 font-medium">
            Hệ thống đang tự động tạo Profile và Nhu cầu đào tạo của bạn
          </p>

          <div className="space-y-4 mb-8">
            <div className="glass-card rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-sm text-left">Đang ghi dữ liệu vào Google Sheets...</p>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-sm text-left">Đang tạo file Profile từ template...</p>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-sm text-left">Đang tạo file Nhu cầu đào tạo...</p>
              </div>
            </div>

            <div className="glass-card rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-sm text-left">Đang xuất file PDF...</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Quá trình này có thể mất 5-10 giây. Vui lòng không đóng trang này.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // POPUP 2: HOÀN TẤT (Sau 7 giây)
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-scale-in">
      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Cảm ơn bạn!
        </h1>
        
        <p className="text-lg text-foreground/80 mb-6">
          Phiếu khảo sát của bạn đã được ghi nhận thành công. Profile và Nhu cầu đào tạo đã được tạo xong!
        </p>

        {/* Link xem kết quả */}
        <div className="glass-card rounded-lg p-6 mb-6 bg-green-500/10 border border-green-500/20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              Xem kết quả Profile của bạn
            </p>
          </div>
          <a
            href="https://drive.google.com/drive/folders/19gUQxUkD1_tQ9dUF7xJEEWI3iQ3LhTm7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200"
          >
            Xem tại đây
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Các file PDF và Docs đã được lưu trong thư mục Google Drive
          </p>
        </div>
        
        <div className="glass-card rounded-lg p-6 mb-8 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Thông tin của bạn sẽ được sử dụng để xây dựng các chương trình đào tạo và phát triển năng lực phù hợp nhất.
          </p>
        </div>

        <Button
          onClick={onReset}
          variant="outline"
          className="transition-colors duration-200"
        >
          Điền phiếu khác
        </Button>
      </div>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(ThankYou);
