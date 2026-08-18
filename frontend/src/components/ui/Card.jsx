import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  padded = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-stone-200/80 shadow-xs
        ${hoverable ? 'hover:shadow-md hover:border-amber-300 transition-all duration-200 cursor-pointer' : ''}
        ${padded ? 'p-5 sm:p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 flex flex-col gap-1 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3' }) => (
  <Component className={`text-lg font-bold text-stone-900 tracking-tight font-serif ${className}`}>
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-stone-500 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`flex-1 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3 ${className}`}>
    {children}
  </div>
);

export default Card;
