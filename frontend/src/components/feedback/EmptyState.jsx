import React from 'react';
import { SearchX } from 'lucide-react';
import Button from '../ui/Button.jsx';

const EmptyState = ({
  icon = <SearchX className="w-10 h-10 text-stone-400" />,
  title = 'No results found',
  description = 'We couldn’t find anything matching your search criteria. Please try adjusting your filters or search terms.',
  actionLabel = null,
  onAction = null,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-stone-200/80 shadow-xs ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-serif text-stone-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-stone-500 max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
