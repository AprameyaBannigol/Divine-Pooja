import React from 'react';

const Textarea = React.forwardRef(({
  label,
  error,
  helperText,
  isDisabled = false,
  fullWidth = true,
  className = '',
  id,
  placeholder,
  rows = 4,
  value,
  onChange,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-stone-700 uppercase tracking-wider select-none"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={isDisabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg text-sm bg-white border text-stone-800 placeholder-stone-400
          transition-all duration-200 focus:outline-none p-3.5
          disabled:bg-stone-100 disabled:text-stone-400 disabled:cursor-not-allowed
          ${error
            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-100'
            : 'border-stone-300 hover:border-amber-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
          }
          ${className}
        `}
        {...props}
      />
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

Textarea.displayName = 'Textarea';

export default Textarea;
