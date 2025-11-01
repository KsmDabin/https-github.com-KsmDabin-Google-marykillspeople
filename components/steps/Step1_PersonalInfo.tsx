
import React from 'react';
import { FormData } from '../../types';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
}

const Step1_PersonalInfo: React.FC<Props> = ({ formData, updateFormData, nextStep }) => {
    const { personalInfo } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateFormData({
            personalInfo: { ...personalInfo, [e.target.name]: e.target.value }
        });
    };
    
    const canProceed = personalInfo.surname && personalInfo.givenName && personalInfo.sex && personalInfo.dateOfBirth && personalInfo.nationality;

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step 1: Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-300">Surname</label>
                        <input type="text" name="surname" id="surname" value={personalInfo.surname} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                    </div>
                    <div>
                        <label htmlFor="givenName" className="block text-sm font-medium text-gray-300">Given Name</label>
                        <input type="text" name="givenName" id="givenName" value={personalInfo.givenName} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                    </div>
                </div>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-300">Sex</label>
                        <select name="sex" id="sex" value={personalInfo.sex} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300">Date of Birth</label>
                        <input type="date" name="dateOfBirth" id="dateOfBirth" value={personalInfo.dateOfBirth} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                    </div>
                    <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-300">Nationality</label>
                        <input type="text" name="nationality" id="nationality" value={personalInfo.nationality} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={nextStep}
                    disabled={!canProceed}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step1_PersonalInfo;