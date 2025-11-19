import { memo, useCallback, useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompetencyRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

const CompetencyRating = ({ label, value, onChange, description }: CompetencyRatingProps) => {
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize onChange handler
  const handleChange = useCallback((val: string) => {
    const numValue = parseInt(val);
    onChange(numValue);
    
    // Hiển thị tooltip khi chọn (dành cho mobile)
    setOpenTooltip(numValue);
    
    // Clear timeout cũ nếu có
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Tự động ẩn tooltip sau 4 giây
    timeoutRef.current = setTimeout(() => {
      setOpenTooltip(null);
    }, 4000);
  }, [onChange]);

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const ratings = [
    { 
      value: 0, 
      label: "Chưa có", 
      shortLabel: "Chưa có",
      tooltip: "Chưa được đào tạo hoặc tiếp xúc với năng lực này"
    },
    { 
      value: 1, 
      label: "Cơ bản", 
      shortLabel: "Cơ bản",
      tooltip: "Hiểu biết lý thuyết, cần hướng dẫn khi thực hiện"
    },
    { 
      value: 2, 
      label: "Áp dụng", 
      shortLabel: "Áp dụng",
      tooltip: "Có thể thực hiện độc lập các tác vụ thông thường"
    },
    { 
      value: 3, 
      label: "Thành thạo", 
      shortLabel: "Thành thạo",
      tooltip: "Thực hiện tốt, có kinh nghiệm xử lý vấn đề phát sinh"
    },
    { 
      value: 4, 
      label: "Chuyên gia", 
      shortLabel: "Chuyên gia",
      tooltip: "Có kiến thức sâu rộng, có thể hướng dẫn người khác"
    },
  ];

  return (
    <div className="space-y-3 py-3 border-b border-border/30 last:border-0">
      <div className="space-y-1">
        <Label className="text-sm font-medium text-foreground/90">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <TooltipProvider delayDuration={200}>
        <RadioGroup
          value={value.toString()}
          onValueChange={handleChange}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {ratings.map((rating) => (
            <div key={rating.value} className="flex-1 min-w-[60px]">
              <Tooltip 
                open={openTooltip === rating.value ? true : undefined}
                onOpenChange={(open) => {
                  // Nếu user hover ra ngoài, clear timeout và đóng tooltip
                  if (!open && openTooltip === rating.value) {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                    }
                    setOpenTooltip(null);
                  }
                }}
              >
                <TooltipTrigger asChild>
                  <div className="relative">
                    <RadioGroupItem
                      value={rating.value.toString()}
                      id={`${label}-${rating.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${label}-${rating.value}`}
                      className="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-border/50 bg-background/50 p-2 md:p-3 hover:bg-accent hover:border-primary cursor-pointer transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      <span className="font-bold text-primary text-sm md:text-base">
                        {rating.value}
                      </span>
                      <span className="text-[10px] md:text-xs text-muted-foreground text-center">
                        {rating.shortLabel}
                      </span>
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px]">
                  <p className="text-xs font-semibold mb-1">{rating.label}</p>
                  <p className="text-xs">{rating.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </RadioGroup>
      </TooltipProvider>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(CompetencyRating);
