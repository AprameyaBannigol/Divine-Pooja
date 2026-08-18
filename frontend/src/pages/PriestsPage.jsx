import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PriestCard from '../components/priest/PriestCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { priestsData } from '../data/priests.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const PriestsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCity = searchParams.get('city') || 'all';

  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [cityFilter, setCityFilter] = useState(initialCity);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPriests = useMemo(() => {
    return priestsData.filter((priest) => {
      const matchesSearch =
        priest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priest.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priest.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity =
        cityFilter === 'all' || priest.city.toLowerCase() === cityFilter.toLowerCase();

      const matchesLanguage =
        languageFilter === 'all' || priest.languages.includes(languageFilter);

      return matchesSearch && matchesCity && matchesLanguage;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [searchTerm, cityFilter, languageFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setLanguageFilter('all');
    setSortBy('rating');
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Verified Acharya Directory
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-2">
            Verified Vedic Priests
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1">
            Connect with background-verified pandits and acharyas trained in authentic Vedic traditions across major Indian cities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={simulateLoading}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search priest by name, city, or ritual specialization..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="City"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            options={[
              { label: 'All Cities', value: 'all' },
              { label: 'Bengaluru', value: 'Bengaluru' },
              { label: 'Mumbai', value: 'Mumbai' },
              { label: 'Delhi NCR', value: 'Delhi NCR' },
              { label: 'Hyderabad', value: 'Hyderabad' },
            ]}
            placeholder={null}
          />
          <Select
            label="Language Fluency"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            options={[
              { label: 'All Languages', value: 'all' },
              { label: 'Sanskrit', value: 'Sanskrit' },
              { label: 'Hindi', value: 'Hindi' },
              { label: 'Kannada', value: 'Kannada' },
              { label: 'Tamil', value: 'Tamil' },
              { label: 'Telugu', value: 'Telugu' },
              { label: 'English', value: 'English' },
            ]}
            placeholder={null}
          />
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: 'Highest Rated', value: 'rating' },
              { label: 'Dakshina: Low to High', value: 'price-asc' },
              { label: 'Dakshina: High to Low', value: 'price-desc' },
            ]}
            placeholder={null}
          />
        </div>
      </div>

      {/* Grid Results or Skeleton or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredPriests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPriests.map((priest) => (
            <PriestCard
              key={priest.id}
              name={priest.name}
              isVerified={priest.isVerified}
              experience={priest.experience}
              languages={priest.languages}
              specialization={priest.specialization}
              location={priest.location}
              rating={priest.rating}
              reviewCount={priest.reviewCount}
              isAvailable={priest.isAvailable}
              startingPrice={priest.startingPrice}
              onViewProfile={() => addToast(`Viewing profile of ${priest.name}`, 'info')}
              onBookNow={() => addToast(`Booking pandit ${priest.name}`, 'success')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Verified Priests Found"
          description="We couldn't find any priests matching your search criteria. Try clearing filters or selecting another city."
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};

export default PriestsPage;
