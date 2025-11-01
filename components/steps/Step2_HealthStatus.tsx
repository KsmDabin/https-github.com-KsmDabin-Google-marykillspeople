
import React from 'react';
import { FormData, HealthLevel } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const healthLevels: HealthLevel[] = ['High', 'Medium', 'Low'];

const Step2_HealthStatus: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { healthStatus } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        updateFormData({
            healthStatus: { ...healthStatus, [e.target.name]: e.target.value }
        });
    };

    const handleRadioChange = (name: string, value: HealthLevel) => {
        updateFormData({
            healthStatus: { ...healthStatus, [name]: value }
        });
    };
    
    const canProceed =
        healthStatus.selfAssessed &&
        healthStatus.diagnosed &&
        (healthStatus.diagnosed !== 'Low' || (healthStatus.diagnosed === 'Low' && healthStatus.diagnosedCondition.trim() !== ''));

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 2: Current Health Status</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">1. Your Self-Assessment</h3>
                    <p className="text-sm text-gray-400 mb-3">How would you rate your current overall health?</p>
                    <div className="flex space-x-4">
                        {healthLevels.map(level => (
                            <button key={level} onClick={() => handleRadioChange('selfAssessed', level)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${healthStatus.selfAssessed === level ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                                {level}
                            </button>
                        ))}
                    </div>
                    <textarea name="selfAssessedDetails" value={healthStatus.selfAssessedDetails} onChange={handleChange} placeholder="Please provide a brief explanation for your assessment..." rows={3} className="mt-4 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"></textarea>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">2. Medical Diagnosis</h3>
                    <p className="text-sm text-gray-400 mb-3">What is the status as diagnosed by a medical professional?</p>
                     <div className="flex space-x-4">
                        {healthLevels.map(level => (
                            <button key={level} onClick={() => handleRadioChange('diagnosed', level)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${healthStatus.diagnosed === level ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                                {level}
                            </button>
                        ))}
                    </div>
                    {healthStatus.diagnosed === 'Low' && (
                         <input type="text" name="diagnosedCondition" value={healthStatus.diagnosedCondition} onChange={handleChange} placeholder="If 'Low', please state the specific illness/condition" className="mt-4 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                    )}
                     <textarea name="doctorOpinion" value={healthStatus.doctorOpinion} onChange={handleChange} placeholder="Please summarize the doctor's opinion on your condition." rows={3} className="mt-4 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"></textarea>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button onClick={nextStep} disabled={!canProceed} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Step2_HealthStatus;