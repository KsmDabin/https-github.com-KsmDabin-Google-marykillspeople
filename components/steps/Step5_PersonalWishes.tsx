
import React from 'react';
import { FormData } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const Step5_PersonalWishes: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { wishesAndImpact } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData({
            wishesAndImpact: { ...wishesAndImpact, [e.target.name]: e.target.value }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 5: Personal Wishes &amp; Reflections</h2>
            <div className="space-y-8">
                <div>
                    <label htmlFor="futureLifeWishes" className="block text-lg font-semibold text-gray-200 mb-3">
                        Considering your health, what are your hopes and wishes for your future?
                    </label>
                    <textarea
                        id="futureLifeWishes"
                        name="futureLifeWishes"
                        value={wishesAndImpact.futureLifeWishes}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe what you hope for, what brings you peace, or any personal goals you have..."
                        className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="impactOnFamily" className="block text-lg font-semibold text-gray-200 mb-3">
                        How do you perceive your health situation affecting your family?
                    </label>
                    <textarea
                        id="impactOnFamily"
                        name="impactOnFamily"
                        value={wishesAndImpact.impactOnFamily}
                        onChange={handleChange}
                        rows={5}
                        placeholder="You may write about your concerns, your hopes for them, or any messages you wish to convey..."
                        className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                    ></textarea>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Step5_PersonalWishes;
