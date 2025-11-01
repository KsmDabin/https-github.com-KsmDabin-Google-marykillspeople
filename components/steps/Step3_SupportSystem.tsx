
import React from 'react';
import { FormData, SupportProvider } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const supportOptions: SupportProvider[] = ['Spouse', 'Children', 'Other'];

const Step3_SupportSystem: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { supportSystem } = formData;

    const handleCheckboxChange = (category: 'homeCare' | 'hospitalCare', value: SupportProvider) => {
        const currentValues = supportSystem[category];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        updateFormData({
            supportSystem: { ...supportSystem, [category]: newValues }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 3: Support System</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Who is available to provide care for you at home?</h3>
                    <div className="space-y-2">
                        {supportOptions.map(option => (
                            <label key={option} className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={supportSystem.homeCare.includes(option)}
                                    onChange={() => handleCheckboxChange('homeCare', option)}
                                    className="h-5 w-5 rounded border-gray-500 bg-gray-800 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-3 text-gray-300">{option === 'Other' ? 'Other (incl. professional caregiver)' : option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Who is available to support you while in the hospital?</h3>
                    <div className="space-y-2">
                        {supportOptions.map(option => (
                           <label key={option} className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={supportSystem.hospitalCare.includes(option)}
                                    onChange={() => handleCheckboxChange('hospitalCare', option)}
                                    className="h-5 w-5 rounded border-gray-500 bg-gray-800 text-blue-600 focus:ring-blue-500"
                                />
                               <span className="ml-3 text-gray-300">{option === 'Other' ? 'Other (incl. professional caregiver)' : option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Step3_SupportSystem;
