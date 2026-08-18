import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({
  label,
  options = [],
  error,
  helperText,
  isDisabled = false,
  fullWidth = true,
  className = '',
  id,
  value,
  onChange,
  placeholder = 'Select option...',
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-stone-700 uppercase tracking-wider select-none"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-lg text-sm bg-white border text-stone-800 appearance-none
            transition-all duration-200 focus:outline-none pr-10 pl-3.5 py-2.5
            disabled:bg-stone-100 disabled:text-stone-400 disabled:cursor-not-allowed
            ${error
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
              : 'border-stone-300 hover:border-amber-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
            }
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => {
            const optValue = typeof option === 'object' ? option.value : option;
            const optLabel = typeof option === 'object' ? option.label : option;
            return (
              <option key={index} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 text-stone-400 pointer-events-none w-4 h-4" />
      </div>
      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-stone-500">
          {helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
