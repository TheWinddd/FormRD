import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface TrainingPriorityTableProps {
  title: string;
  items: string[];
  values: Record<string, string>;
  onChange: (itemIndex: number, value: string) => void;
  limitHighPriority?: boolean; // Giới hạn "Ưu tiên cao" tối đa 2 lần
}

const TrainingPriorityTable = memo(({ title, items, values, onChange, limitHighPriority = false }: TrainingPriorityTableProps) => {
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  const priorities = [
    { value: "not-relevant", label: "Không phù hợp với chuyên môn của tôi" },
    { value: "not-priority", label: "Chưa phải là ưu tiên trong năm tới" },
    { value: "high-priority", label: "Ưu tiên cao trong năm tới" },
  ];

  const handleChange = (itemIndex: number, value: string) => {
    // Nếu có giới hạn và đang chọn "high-priority"
    if (limitHighPriority && value === "high-priority") {
      // Đếm số lượng "high-priority" hiện tại (không bao gồm item đang chọn)
      const currentHighPriorityCount = Object.entries(values).filter(
        ([key, val]) => val === "high-priority" && key !== itemIndex.toString()
      ).length;

      // Nếu đã có 2 "high-priority" rồi, hiện cảnh báo
      if (currentHighPriorityCount >= 2) {
        setShowLimitDialog(true);
        return;
      }
    }

    onChange(itemIndex, value);
  };

  return (
    <>
      <div className="glass-card rounded-xl p-4 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>
        <p className="text-xs text-muted-foreground mb-4">
          <span className="text-destructive">*</span> Vui lòng chọn một trong ba lựa chọn cho mỗi năng lực bên dưới
          {limitHighPriority && (
            <span className="block mt-2 text-amber-600 font-semibold">
              ⚠️ Lưu ý: Bạn chỉ được chọn "Ưu tiên cao trong năm tới" tối đa 2 lần
            </span>
          )}
        </p>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="glass-card rounded-lg p-3 md:p-4">
              <Label className="text-sm font-medium mb-3 block">{item}</Label>
              <RadioGroup
                value={values[index] || ""}
                onValueChange={(value) => handleChange(index, value)}
                className="flex flex-col space-y-2"
              >
                {priorities.map((priority) => (
                  <div 
                    key={priority.value} 
                    className="flex items-start space-x-2 cursor-pointer"
                    onClick={() => handleChange(index, priority.value)}
                  >
                    <RadioGroupItem
                      value={priority.value}
                      id={`${index}-${priority.value}`}
                      className="mt-1 flex-shrink-0 pointer-events-none"
                    />
                    <Label
                      className="text-xs cursor-pointer font-normal leading-tight"
                    >
                      {priority.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đã vượt quá số lần chọn</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Bạn đã chọn "Ưu tiên cao trong năm tới" đủ 2 lần rồi.</p>
              <p className="font-semibold text-foreground">
                Vui lòng suy nghĩ và lựa chọn lại để chỉ ưu tiên tối đa 2 năng lực quan trọng nhất.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLimitDialog(false)}>
              Đã hiểu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

TrainingPriorityTable.displayName = 'TrainingPriorityTable';

export default TrainingPriorityTable;
