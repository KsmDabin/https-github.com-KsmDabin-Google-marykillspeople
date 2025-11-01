import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    goToStep: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, goToStep }) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const steps = [
        "Personal", "Health", "Support", "Prognosis", "Wishes", "Directive", "Donation", "Summary"
    ];

    return (
        <div className="w-full mb-8">
            <div className="relative h-2 bg-gray-700 rounded-full">
                <div 
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;

                    let stepClasses = `w-1/${totalSteps} text-center transition-colors duration-200`;

                    if (isActive) {
                        stepClasses += ' font-bold text-blue-400';
                    } else if (isCompleted) {
                        stepClasses += ' text-gray-300 cursor-pointer hover:text-blue-300';
                    } else {
                        stepClasses += ' text-gray-500';
                    }

                    return (
                        <div 
                            key={index}
                            onClick={() => isCompleted && goToStep(stepNumber)}
                            className={stepClasses}
                        >
                            {step}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;