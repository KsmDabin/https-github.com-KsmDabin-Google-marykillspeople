
import React from 'react';
import { FormData, PrognosisPeriod, InsuranceCoverage } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const prognosisOptions: PrognosisPeriod[] = ['3 Months', '6 Months', '1 Year', '2 Years'];
const insuranceCoverageOptions: InsuranceCoverage[] = ['30%', '50%', '70%', '100%'];

const Step4_PrognosisInsurance: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { prognosisAndInsurance, financial } = formData;

    const handlePAIChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormData({
            prognosisAndInsurance: { ...prognosisAndInsurance, [e.target.name]: e.target.value }
        });
    };
    
    const handleFinancialChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData({
            financial: { ...financial, [e.target.name]: e.target.value }
        });
    };

    const handleToggle = (name: 'hasInsurance' | 'isFamilyProvidedFor' | 'hasLifeInsurance') => {
        if (name === 'hasInsurance') {
            updateFormData({ prognosisAndInsurance: { ...prognosisAndInsurance, hasInsurance: !prognosisAndInsurance.hasInsurance } });
        } else {
            updateFormData({ financial: { ...financial, [name]: !financial[name] } });
        }
    };
    
    const canProceed =
        prognosisAndInsurance.recoveryPrognosis &&
        (!prognosisAndInsurance.hasInsurance || (prognosisAndInsurance.hasInsurance && prognosisAndInsurance.insuranceCoverage)) &&
        (financial.isFamilyProvidedFor || (!financial.isFamilyProvidedFor && financial.financialWishes.trim() !== ''));

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 4: Prognosis, Insurance &amp; Finances</h2>
            <div className="space-y-8">
                <div>
                    <label htmlFor="recoveryPrognosis" className="block text-sm font-medium text-gray-300 mb-2">What is the doctor's prognosis for recovery?</label>
                    <select name="recoveryPrognosis" id="recoveryPrognosis" value={prognosisAndInsurance.recoveryPrognosis} onChange={handlePAIChange} className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                        <option value="">Select a timeframe...</option>
                        {prognosisOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Do you have medical insurance for treatment?</label>
                    <button onClick={() => handleToggle('hasInsurance')} className={`w-full text-left p-3 rounded-lg ${prognosisAndInsurance.hasInsurance ? 'bg-green-800/50 text-green-300' : 'bg-red-800/50 text-red-300'}`}>
                        {prognosisAndInsurance.hasInsurance ? 'Yes, I am insured' : 'No, I am not insured'}
                    </button>
                    {prognosisAndInsurance.hasInsurance && (
                        <div className="mt-4">
                             <label htmlFor="insuranceCoverage" className="block text-sm font-medium text-gray-300 mb-2">What percentage of treatment is covered?</label>
                            <select name="insuranceCoverage" id="insuranceCoverage" value={prognosisAndInsurance.insuranceCoverage} onChange={handlePAIChange} className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                                <option value="">Select coverage...</option>
                                {insuranceCoverageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Are your family's living expenses secured by your assets or income?</label>
                    <button onClick={() => handleToggle('isFamilyProvidedFor')} className={`w-full text-left p-3 rounded-lg ${financial.isFamilyProvidedFor ? 'bg-green-800/50 text-green-300' : 'bg-yellow-800/50 text-yellow-300'}`}>
                        {financial.isFamilyProvidedFor ? 'Yes, they are provided for' : 'No, they are not fully provided for'}
                    </button>
                    {!financial.isFamilyProvidedFor && (
                        <textarea name="financialWishes" value={financial.financialWishes} onChange={handleFinancialChange} placeholder="If no, what are your wishes for their financial care?" rows={3} className="mt-4 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"></textarea>
                    )}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Do you have life insurance?</label>
                    <button onClick={() => handleToggle('hasLifeInsurance')} className={`w-full text-left p-3 rounded-lg ${financial.hasLifeInsurance ? 'bg-green-800/50 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                        {financial.hasLifeInsurance ? 'Yes, I have life insurance' : 'No, I do not have life insurance'}
                    </button>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button onClick={nextStep} disabled={!canProceed} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Step4_PrognosisInsurance;