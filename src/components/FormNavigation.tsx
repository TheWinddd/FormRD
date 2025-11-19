import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep?: boolean;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isLastStep = false,
  isNextDisabled = false,
  isSubmitting = false,
}: FormNavigationProps) => {
  return (
    <div className="flex items-center justify-between gap-4 pt-6">
      {currentStep > 1 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="glass-card glass-card-hover"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      ) : (
        <div />
      )}
      
      <Button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className="ml-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-200 shadow-lg disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            {isLastStep ? "Gửi phiếu khảo sát" : "Tiếp tục"}
            {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
          </>
        )}
      </Button>
    </div>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(FormNavigation);
