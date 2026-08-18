import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, UserCheck } from 'lucide-react';
import Button from '../ui/Button.jsx';

const DiscoverySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pooja');
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('Bengaluru');

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'pooja') {
      navigate(`/poojas?search=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(city)}`);
    } else {
      navigate(`/priests?search=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('pooja')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'pooja'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Book a Pooja
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('priest')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'priest'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Find a Priest
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs text-stone-500 font-medium">
          Instant Discovery
        </span>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            {activeTab === 'pooja' ? 'Pooja or Ceremony Name' : 'Priest Name or Specialization'}
          </label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={activeTab === 'pooja' ? 'e.g. Satyanarayan, Griha Pravesh, Havan...' : 'e.g. Pt. Ramesh, Vastu Expert...'}
              className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-3 relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            City / Location
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-3 pt-4 md:pt-5">
          <Button type="submit" variant="primary" size="md" fullWidth>
            Search Marketplace
          </Button>
        </div>
      </form>

      {/* Quick Search Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-stone-500">
        <span className="font-semibold text-stone-700">Popular Searches:</span>
        {['Griha Pravesh', 'Satyanarayan Katha', 'Vastu Havan', 'Mahamrityunjay'].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setSearchTerm(chip);
              navigate(`/poojas?search=${encodeURIComponent(chip)}`);
            }}
            className="px-2.5 py-1 bg-amber-50 text-amber-900 hover:bg-amber-100 rounded-full border border-amber-200 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
};

export default DiscoverySection;
