
import React, { useState, useEffect } from 'react';
import { FormData } from '../../types';
import { CheckCircleIcon } from '../icons';

interface Props {
    formData: FormData;
}

const Step9_Confirmation: React.FC<Props> = ({ formData }) => {
    const [transactionHash, setTransactionHash] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const createHash = async () => {
            try {
                const dataString = JSON.stringify(formData);
                const encoder = new TextEncoder();
                const data = encoder.encode(dataString);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                setTransactionHash(`0x${hashHex}`);
            } catch (error) {
                console.error("Error generating hash:", error);
                setTransactionHash('Error generating secure hash.');
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
           createHash();
        }, 2000); // Simulate processing time

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <div className="text-center">
            {isLoading ? (
                 <div>
                    <svg className="animate-spin mx-auto h-12 w-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-white mt-4">Securing Your Directive...</h2>
                    <p className="text-gray-400 mt-2">Creating an immutable record on the conceptual DignityChain.</p>
                </div>
            ) : (
                <div>
                    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-400" />
                    <h2 className="text-3xl font-bold text-white mt-4">Directive Secured</h2>
                    <p className="text-gray-400 mt-2">
                        Your Advance Directive has been securely recorded.
                    </p>
                    <div className="mt-6 text-left bg-gray-900 border border-gray-700 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-300">Blockchain Transaction Hash (Conceptual):</p>
                        <p className="text-xs text-green-400 font-mono break-all mt-1">{transactionHash}</p>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400">
                            A notification has been conceptually dispatched via a secure channel to your designated family member ({formData.advanceDirective.familyMemberName}) and physician ({formData.advanceDirective.physicianName}).
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Please keep a copy of the transaction hash for your records.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step9_Confirmation;
