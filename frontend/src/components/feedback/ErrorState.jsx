import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button.jsx';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please check your internet connection or try again.',
  onRetry = null,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-red-50/40 rounded-2xl border border-red-200/60 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-red-100/70 text-red-600 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold font-serif text-stone-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-stone-600 max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {onRetry && (
        <Button
          variant="destructive"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
