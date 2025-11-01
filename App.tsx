import React, { useState } from 'react';
import { FormData, initialFormData } from './types';
import StepIndicator from './components/StepIndicator';
import Step1_PersonalInfo from './components/steps/Step1_PersonalInfo';
import Step2_HealthStatus from './components/steps/Step2_HealthStatus';
import Step3_SupportSystem from './components/steps/Step3_SupportSystem';
import Step4_PrognosisInsurance from './components/steps/Step4_PrognosisInsurance';
import Step5_PersonalWishes from './components/steps/Step5_PersonalWishes';
import Step6_AdvanceDirective from './components/steps/Step6_AdvanceDirective';
import Step7_OrganDonation from './components/steps/Step7_OrganDonation';
import Step8_Summary from './components/steps/Step8_Summary';
import Step9_Confirmation from './components/steps/Step9_Confirmation';
import { CheckCircleIcon } from './components/icons';

const totalSteps = 9;

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isWelcome, setIsWelcome] = useState(true);

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };
    
    const goToStep = (step: number) => {
      if(step > 0 && step <= totalSteps) {
        setCurrentStep(step);
      }
    }


    if (isWelcome) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center text-gray-200 p-4">
                <div className="max-w-2xl text-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                    <CheckCircleIcon className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-4">Dignified Endings Directive</h1>
                    <p className="mb-6 text-gray-400">
                        This application is a tool to help you document your current health status and articulate your wishes regarding end-of-life care. It is designed to facilitate clear communication and ensure your choices are understood and respected. Every individual has the right to a dignified and honored passing.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        Please proceed with solemn consideration. The information you provide will be used to construct a personal directive.
                    </p>
                    <button
                        onClick={() => setIsWelcome(false)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Begin the Process
                    </button>
                </div>
            </div>
        );
    }


    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1_PersonalInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
            case 2:
                return <Step2_HealthStatus formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <Step3_SupportSystem formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <Step4_PrognosisInsurance formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 5:
                return <Step5_PersonalWishes formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 6:
                return <Step6_AdvanceDirective formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 7:
                return <Step7_OrganDonation formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 8:
                return <Step8_Summary formData={formData} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
            case 9:
                return <Step9_Confirmation formData={formData} />;
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {currentStep < 9 && <StepIndicator currentStep={currentStep} totalSteps={totalSteps - 1} goToStep={goToStep} />}
                <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8 mt-6">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default App;