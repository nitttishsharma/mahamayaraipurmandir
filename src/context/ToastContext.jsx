import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, HelpCircle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ id, type, message, onClose, onConfirm }) => {
    const icons = {
        success: <CheckCircle size={20} className="text-green-500" />,
        error: <AlertCircle size={20} className="text-red-500" />,
        info: <Info size={20} className="text-blue-500" />,
        warning: <AlertTriangle size={20} className="text-amber-500" />,
        confirm: <HelpCircle size={20} className="text-purple-500" />
    };

    const bgColors = {
        success: 'bg-white border-l-4 border-green-500',
        error: 'bg-white border-l-4 border-red-500',
        info: 'bg-white border-l-4 border-blue-500',
        warning: 'bg-white border-l-4 border-amber-500',
        confirm: 'bg-white border-l-4 border-purple-500'
    };

    return (
        <div className={`flex flex-col w-full max-w-sm p-4 mb-4 text-gray-800 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0 ${bgColors[type] || bgColors.info} animate-slide-in`}>
            <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                    {icons[type] || icons.info}
                </div>
                <div className="ml-3 text-sm font-medium pr-6 flex-grow">
                    {message}
                </div>
                {type !== 'confirm' && (
                    <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                        onClick={() => onClose(id)}
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {type === 'confirm' && (
                <div className="flex justify-end gap-2 mt-3 ml-8">
                    <button
                        onClick={() => onClose(id)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose(id);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            )}
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', onConfirm = null) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type, onConfirm }]);

        // Auto remove after 5 seconds ONLY if not a confirmation toast
        if (type !== 'confirm') {
            setTimeout(() => {
                removeToast(id);
            }, 5000);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        info: (msg) => addToast(msg, 'info'),
        warning: (msg) => addToast(msg, 'warning'),
        confirm: (msg, onConfirm) => addToast(msg, 'confirm', onConfirm),
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
