
import React, { useState } from 'react';
import { FormData } from '../../types';
import { generateDirectiveSummary } from '../../services/geminiService';

interface Props {
    formData: FormData;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
}

const SummaryItem: React.FC<{ label: string; value: React.ReactNode; step: number; onEdit: (step: number) => void }> = ({ label, value, step, onEdit }) => (
    <div className="py-3 sm:grid sm:grid-cols-4 sm:gap-4 items-start">
        <dt className="text-sm font-medium text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">{value || 'Not provided'}</dd>
        <dd className="mt-2 sm:mt-0 sm:col-span-1 text-right">
             <button onClick={() => onEdit(step)} className="text-sm font-medium text-blue-400 hover:text-blue-300">Edit</button>
        </dd>
    </div>
);

const Step8_Summary: React.FC<Props> = ({ formData, nextStep, prevStep, goToStep }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        try {
            const result = await generateDirectiveSummary(formData);
            setSummary(result);
        } catch (error) {
            console.error(error);
            setSummary("Failed to generate summary.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 8: Review Your Directive</h2>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
                <dl className="divide-y divide-gray-700">
                    <div className="px-4 py-3 bg-gray-700/50">
                       <h3 className="text-lg font-semibold text-white">Directive Details</h3>
                    </div>
                    <div className="p-4 space-y-2">
                        <SummaryItem label="Full Name" value={`${formData.personalInfo.givenName} ${formData.personalInfo.surname}`} step={1} onEdit={goToStep} />
                        <SummaryItem label="Health Status (Self-Assessed)" value={formData.healthStatus.selfAssessed} step={2} onEdit={goToStep} />
                        <SummaryItem label="Health Status (Diagnosed)" value={formData.healthStatus.diagnosed} step={2} onEdit={goToStep} />
                        <SummaryItem label="Refuse Treatment" value={formData.advanceDirective.refuseTreatment ? 'Yes' : 'No'} step={6} onEdit={goToStep} />
                        <SummaryItem label="Organ Donation" value={formData.organDonation.consentToDonate ? 'Yes' : 'No'} step={7} onEdit={goToStep} />
                    </div>
                </dl>
            </div>
            
            <div className="mt-8">
                 <button 
                    onClick={handleGenerateSummary}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                    {isLoading ? (
                         <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Formal Document...
                        </>
                    ) : "Generate Formal Document with AI"}
                </button>
            </div>
            
            {summary && (
                <div className="mt-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Generated Directive Summary</h3>
                    <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">{summary}</div>
                </div>
            )}

            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button 
                    onClick={nextStep}
                    disabled={!summary}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Confirm & Create Secure Record
                </button>
            </div>
        </div>
    );
};

export default Step8_Summary;
