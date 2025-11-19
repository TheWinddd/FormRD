import { useState } from "react";
import { toast } from "sonner";
import ProgressBar from "@/components/ProgressBar";
import FormNavigation from "@/components/FormNavigation";
import Step0Introduction from "@/components/steps/Step0Introduction";
import Step1BasicInfo from "@/components/steps/Step1BasicInfo";
import Step2Foundation from "@/components/steps/Step2Foundation";
import Step3Professional from "@/components/steps/Step3Professional";
import Step4Training from "@/components/steps/Step4Training";
import Step5AdditionalInfo from "@/components/steps/Step5AdditionalInfo";
import Step6Review from "@/components/steps/Step6Review";
import ThankYou from "@/components/ThankYou";
import { submitToGoogleSheets } from "@/services/googleSheets";

const TOTAL_STEPS = 6;

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    step1: {
      email: "",
      phone: "",
      fullName: "",
      department: "",
      unit: "",
      position: "",
      yearsExperience: "",
      degree: "",
      otherDegree: "",
      major: "",
      keywords: [] as string[],
      notableProjects: "",
    },
    step2: {
      methodology1: 0,
      methodology2: 0,
      methodology3: 0,
      methodology4: 0,
      creativity1: 0,
      creativity2: 0,
      creativity3: 0,
      creativity4: 0,
      tools1: 0,
      tools2: 0,
    },
    step3: {
      market1: 0,
      source1: 0,
      source2: 0,
      source3: 0,
      source4: 0,
      source5: 0,
      formula1: 0,
      formula2: 0,
      formula3: 0,
      preclinical1: 0,
      preclinical2: 0,
      clinical1: 0,
      clinical2: 0,
      regulatory1: 0,
      regulatory2: 0,
      transfer1: 0,
      transfer2: 0,
      postmarket1: 0,
      postmarket2: 0,
    },
    step4: {
      foundationPriorities: {} as Record<string, string>,
      otherFoundation: "",
      professionalPriorities: {} as Record<string, string>,
      otherProfessional: "",
      challenges: "",
      suggestions: "",
    },
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        // Không cần validate trang giới thiệu
        return true;
      case 1:
        const { email, phone, fullName, department, unit, position, yearsExperience, degree, major, keywords, notableProjects } = formData.step1;
        if (!email || !phone || !fullName || !department || !unit || !position || !yearsExperience || !degree || !major || keywords.length < 1 || !notableProjects) {
          toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Vui lòng nhập email hợp lệ");
          return false;
        }
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
          toast.error("Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)");
          return false;
        }
        if (degree === "other" && !formData.step1.otherDegree) {
          toast.error("Vui lòng ghi rõ bậc học khác");
          return false;
        }
        break;
      case 2:
      case 3:
        // Optional: Add validation for ratings if needed
        break;
      case 4:
        // Validate Step 4 - PHẦN C (C1 và C3)
        const { foundationPriorities, professionalPriorities } = formData.step4;

        // Kiểm tra C1: Bảng năng lực nền tảng - phải chọn tất cả 10 items
        const foundationCount = Object.keys(foundationPriorities).length;
        if (foundationCount < 10) {
          toast.error("Vui lòng chọn mức độ ưu tiên cho tất cả các năng lực nền tảng (C1)");
          return false;
        }

        // Kiểm tra C3: Bảng năng lực chuyên môn - phải chọn tất cả 20 items
        const professionalCount = Object.keys(professionalPriorities).length;
        if (professionalCount < 20) {
          toast.error("Vui lòng chọn mức độ ưu tiên cho tất cả các năng lực chuyên môn (C2)");
          return false;
        }
        break;
      case 5:
        // Validate Step 5 - Bước 5 (C2, C4, C5, C6)
        const { challenges, suggestions } = formData.step4;

        // Kiểm tra C5: Khó khăn
        if (!challenges || challenges.trim().length === 0) {
          toast.error("Vui lòng mô tả khó khăn bạn đang gặp phải (C5)");
          return false;
        }

        // Kiểm tra C6: Đề xuất
        if (!suggestions || suggestions.trim().length === 0) {
          toast.error("Vui lòng đề xuất về các chương trình đào tạo (C6)");
          return false;
        }
        break;
      case 6:
        // Validate Step 6 - Bước 6 (Review - không cần validate gì thêm)
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === TOTAL_STEPS) {
      handleSubmit();
    } else {
      // Scroll lên đầu ngay lập tức trước khi chuyển step
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Delay nhỏ để animation scroll diễn ra mượt
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      }, 100);
    }
  };

  const handleBack = () => {
    // Scroll lên đầu ngay lập tức
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, 100);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Tránh gửi trùng lặp

    try {
      setIsSubmitting(true);

      // Hiện popup "Đang tạo profile" ngay sau 1 giây (không đợi API)
      setTimeout(() => {
        setShowThankYou(true);
        setIsSubmitting(false);
      }, 1000);

      // Gửi dữ liệu lên Google Sheets trong background (không await)
      submitToGoogleSheets(formData)
        .then(() => {
          console.log("Form submitted successfully:", formData);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Nếu có lỗi, vẫn cho user thấy popup (vì có thể data đã gửi được)
        });

    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowThankYou(false);
    setIsSubmitting(false);
    setFormData({
      step1: {
        email: "",
        phone: "",
        fullName: "",
        department: "",
        unit: "",
        position: "",
        yearsExperience: "",
        degree: "",
        otherDegree: "",
        major: "",
        keywords: [],
        notableProjects: "",
      },
      step2: {
        methodology1: 0,
        methodology2: 0,
        methodology3: 0,
        methodology4: 0,
        creativity1: 0,
        creativity2: 0,
        creativity3: 0,
        creativity4: 0,
        tools1: 0,
        tools2: 0,
      },
      step3: {
        market1: 0,
        source1: 0,
        source2: 0,
        source3: 0,
        source4: 0,
        source5: 0,
        formula1: 0,
        formula2: 0,
        formula3: 0,
        preclinical1: 0,
        preclinical2: 0,
        clinical1: 0,
        clinical2: 0,
        regulatory1: 0,
        regulatory2: 0,
        transfer1: 0,
        transfer2: 0,
        postmarket1: 0,
        postmarket2: 0,
      },
      step4: {
        foundationPriorities: {},
        otherFoundation: "",
        professionalPriorities: {},
        otherProfessional: "",
        challenges: "",
        suggestions: "",
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showThankYou) {
    return <ThankYou onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen pb-12">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {currentStep === 0 && (
          <Step0Introduction />
        )}

        {currentStep === 1 && (
          <Step1BasicInfo
            data={formData.step1}
            onChange={(data) => setFormData({ ...formData, step1: { ...formData.step1, ...data } })}
          />
        )}

        {currentStep === 2 && (
          <Step2Foundation
            data={formData.step2}
            onChange={(data) => setFormData({ ...formData, step2: { ...formData.step2, ...data } })}
          />
        )}

        {currentStep === 3 && (
          <Step3Professional
            data={formData.step3}
            onChange={(data) => setFormData({ ...formData, step3: { ...formData.step3, ...data } })}
          />
        )}

        {currentStep === 4 && (
          <Step4Training
            data={formData.step4}
            onChange={(data) => setFormData({ ...formData, step4: { ...formData.step4, ...data } })}
          />
        )}

        {currentStep === 5 && (
          <Step5AdditionalInfo
            data={{
              otherFoundation: formData.step4.otherFoundation,
              otherProfessional: formData.step4.otherProfessional,
              challenges: formData.step4.challenges,
              suggestions: formData.step4.suggestions,
            }}
            onChange={(data) => setFormData({ ...formData, step4: { ...formData.step4, ...data } })}
          />
        )}

        {currentStep === 6 && (
          <Step6Review formData={formData} />
        )}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={handleNext}
          onBack={handleBack}
          isLastStep={currentStep === TOTAL_STEPS}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default Index;
