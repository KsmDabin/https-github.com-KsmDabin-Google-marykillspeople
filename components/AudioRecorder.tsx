
import React, { useState, useRef, useEffect } from 'react';
import { AudioConsent } from '../types';
import { MicrophoneIcon, StopCircleIcon, PlayCircleIcon, TrashIcon } from './icons';

interface AudioRecorderProps {
    id: string;
    label: string;
    value: AudioConsent;
    onChange: (value: AudioConsent) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ id, label, value, onChange }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [permissionError, setPermissionError] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Cleanup function to stop media stream when component unmounts
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermissionError(false);
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                onChange({ blobUrl: audioUrl, isRecorded: true });
                // Stop the media stream tracks after recording is finished
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setPermissionError(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const deleteRecording = () => {
        if (value.blobUrl) {
            URL.revokeObjectURL(value.blobUrl);
        }
        onChange({ blobUrl: null, isRecorded: false });
    };

    const playRecording = () => {
        if (value.blobUrl && audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="p-4 border border-gray-600 rounded-lg bg-gray-900/50">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="flex items-center space-x-3">
                {!value.isRecorded ? (
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`p-3 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    >
                        {isRecording ? <StopCircleIcon className="w-6 h-6" /> : <MicrophoneIcon className="w-6 h-6" />}
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={playRecording}
                            className="p-3 rounded-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white transition-colors"
                        >
                            <PlayCircleIcon className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            onClick={deleteRecording}
                            className="p-3 rounded-full flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                        >
                            <TrashIcon className="w-6 h-6" />
                        </button>
                    </>
                )}
                <div className="flex-1 text-sm text-gray-400">
                    {isRecording && <span className="text-red-400 animate-pulse">Recording...</span>}
                    {value.isRecorded && <span className="text-green-400">Consent recorded.</span>}
                    {!isRecording && !value.isRecorded && <span>Ready to record.</span>}
                    {permissionError && <span className="text-red-500">Microphone access denied.</span>}
                </div>
            </div>
            {value.blobUrl && <audio ref={audioRef} src={value.blobUrl} className="hidden" />}
        </div>
    );
};

export default AudioRecorder;
