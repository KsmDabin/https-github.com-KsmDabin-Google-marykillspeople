
import React from 'react';
import { FormData, AudioConsent, PassingLocation } from '../../types';
import AudioRecorder from '../AudioRecorder';

interface Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const locationOptions: PassingLocation[] = ['Home', 'Hospital', 'Hospice/Nursing Home'];

const Step6_AdvanceDirective: React.FC<Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const { advanceDirective } = formData;

    const handleToggle = (name: 'refuseTreatment') => {
        updateFormData({ advanceDirective: { ...advanceDirective, [name]: !advanceDirective[name] } });
    };

    const handleAudioChange = (name: 'patientConsent' | 'familyConsent' | 'physicianConsent', value: AudioConsent) => {
        updateFormData({ advanceDirective: { ...advanceDirective, [name]: value } });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateFormData({
            advanceDirective: { ...advanceDirective, [e.target.name]: e.target.value }
        });
    }

    const canProceed = 
        advanceDirective.refuseTreatment && 
        advanceDirective.preferredLocation &&
        advanceDirective.patientConsent.isRecorded && 
        advanceDirective.familyConsent.isRecorded && 
        advanceDirective.physicianConsent.isRecorded && 
        advanceDirective.familyMemberName.trim() !== '' && 
        advanceDirective.physicianName.trim() !== '';

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">Step 6: Advance Directive</h2>
            <p className="text-sm text-gray-400 mb-6">This section documents your wishes regarding end-of-life medical care.</p>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Life-Sustaining Treatment</h3>
                    <div className="p-4 border border-yellow-500/50 bg-yellow-900/20 rounded-lg">
                        <p className="text-sm text-yellow-300 mb-4">Please check the box below if you agree with the following statement: <br/> "If my health becomes irrecoverable and my consciousness is irreversibly diminished, I wish to refuse further life-sustaining medical treatment."</p>
                        <label className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={advanceDirective.refuseTreatment}
                                onChange={() => handleToggle('refuseTreatment')}
                                className="h-5 w-5 rounded border-gray-500 bg-gray-800 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-200 font-medium">I agree to refuse life-sustaining treatment under these conditions.</span>
                        </label>
                    </div>
                </div>

                {advanceDirective.refuseTreatment && (
                    <>
                        <div>
                             <label htmlFor="preferredLocation" className="block text-lg font-semibold text-gray-200 mb-3">Where would you prefer to spend your final moments?</label>
                            <select name="preferredLocation" id="preferredLocation" value={advanceDirective.preferredLocation} onChange={handleInputChange} className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                                <option value="">Select a location...</option>
                                {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-3">Verbal Consent Recordings</h3>
                            <p className="text-sm text-gray-400 mb-4">To ensure clarity and agreement, please record a verbal confirmation from all parties.</p>
                            <div className="space-y-4">
                                <AudioRecorder id="patientConsent" label="Your Verbal Consent" value={advanceDirective.patientConsent} onChange={(v) => handleAudioChange('patientConsent', v)} />
                                
                                <input type="text" name="familyMemberName" placeholder="Family Member's Full Name" value={advanceDirective.familyMemberName} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                                <AudioRecorder id="familyConsent" label="Family Member's Verbal Consent" value={advanceDirective.familyConsent} onChange={(v) => handleAudioChange('familyConsent', v)} />
                                
                                <input type="text" name="physicianName" placeholder="Primary Physician's Full Name" value={advanceDirective.physicianName} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white" />
                                <AudioRecorder id="physicianConsent" label="Primary Physician's Verbal Consent" value={advanceDirective.physicianConsent} onChange={(v) => handleAudioChange('physicianConsent', v)} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={prevStep} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Back</button>
                <button onClick={nextStep} disabled={advanceDirective.refuseTreatment && !canProceed} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Step6_AdvanceDirective;