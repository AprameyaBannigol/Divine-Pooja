import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerActions,
  size = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`w-full bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden transform transition-all duration-200 animate-in zoom-in-95 ${sizeClasses[size] || sizeClasses.md}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-amber-50/30">
          <div>
            {title && (
              <h3 id="modal-title" className="text-lg font-bold font-serif text-stone-900">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] text-stone-700 text-sm leading-relaxed">
          {children}
        </div>

        {/* Modal Footer */}
        {footerActions ? (
          <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-end gap-3">
            {footerActions}
          </div>
        ) : (
          <div className="px-6 py-3 border-t border-stone-100 bg-stone-50/50 flex justify-end">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
