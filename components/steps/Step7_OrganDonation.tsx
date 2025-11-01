
import React from 'react';
import { FormData } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const Step7_OrganDonation: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { organDonation } = formData;

    const handleToggle = (name: 'consentToDonate' | 'legalAgreement') => {
        updateFormData({ organDonation: { ...organDonation, [name]: !organDonation[name] } });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 7: Organ Donation &amp; Final Agreement</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Organ Donation</h3>
                    <p className="text-sm text-gray-400 mb-4">Do you wish for parts of your body to be donated to another person upon your passing?</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => updateFormData({ organDonation: { ...organDonation, consentToDonate: true }})}
                            className={`flex-1 p-4 rounded-lg text-center font-medium transition-colors ${organDonation.consentToDonate === true ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                        >
                            Yes, I consent to donate.
                        </button>
                         <button
                            onClick={() => updateFormData({ organDonation: { ...organDonation, consentToDonate: false }})}
                            className={`flex-1 p-4 rounded-lg text-center font-medium transition-colors ${organDonation.consentToDonate === false ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                        >
                            No, I do not consent.
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Legal Agreement</h3>
                    <div className="p-4 border border-blue-500/50 bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-200 mb-4">By checking the box below, you affirm that all information provided in this directive is true to the best of your knowledge and that you accept full legal responsibility for the decisions documented herein.</p>
                        <label className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={organDonation.legalAgreement}
                                onChange={() => handleToggle('legalAgreement')}
                                className="h-5 w-5 rounded border-gray-500 bg-gray-800 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-200 font-medium">I agree and affirm the statement above.</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button
                    onClick={nextStep}
                    disabled={!organDonation.legalAgreement}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Review My Directive
                </button>
            </div>
        </div>
    );
};

export default Step7_OrganDonation;
