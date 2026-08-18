import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button.jsx';

const SearchBar = ({
  placeholder = 'Search poojas, priests, rituals...',
  onSearch,
  value: externalValue,
  onChange: externalOnChange,
  size = 'md',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (externalOnChange) {
      externalOnChange(newVal);
    } else {
      setInternalValue(newVal);
    }
  };

  const handleClear = () => {
    if (externalOnChange) {
      externalOnChange('');
    } else {
      setInternalValue('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full max-w-2xl bg-white border border-stone-300 rounded-xl shadow-xs hover:border-amber-400 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all duration-200 ${className}`}
    >
      <div className="pl-4 text-stone-400 shrink-0">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-3 pl-3 pr-10 text-sm bg-transparent text-stone-800 placeholder-stone-400 focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-20 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="pr-1.5 shrink-0">
        <Button
          type="submit"
          variant="primary"
          size={size === 'sm' ? 'sm' : 'md'}
          className="rounded-lg font-medium"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
