import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface FallbackUIProps {
    onReset: () => void;
}

const FallbackUI: React.FC<FallbackUIProps> = ({ onReset }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-300 p-4">
            <div className="text-center bg-slate-800/50 border border-red-500/50 rounded-lg p-8 max-w-lg shadow-2xl shadow-red-500/10">
                <ExclamationTriangleIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">Oops, Something Went Wrong</h1>
                <p className="text-slate-400 mb-6">
                    An unexpected error occurred. Please try reloading the page. If the problem persists, please contact support.
                </p>
                <button
                    onClick={onReset}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Reload Page
                </button>
            </div>
        </div>
    );
};

export default FallbackUI;