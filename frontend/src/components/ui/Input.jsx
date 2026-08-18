import React from 'react';

const Input = React.forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  leftIcon,
  rightIcon,
  isDisabled = false,
  fullWidth = true,
  className = '',
  id,
  placeholder,
  value,
  onChange,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-stone-700 uppercase tracking-wider select-none"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-stone-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-lg text-sm bg-white border text-stone-800 placeholder-stone-400
            transition-all duration-200 focus:outline-none
            disabled:bg-stone-100 disabled:text-stone-400 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            py-2.5
            ${error
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
              : 'border-stone-300 hover:border-amber-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
            }
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-stone-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-600 font-medium flex items-center gap-1">
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

Input.displayName = 'Input';

export default Input;
