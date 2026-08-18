import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PoojaCard from '../components/pooja/PoojaCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { poojasData } from '../data/poojas.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const PoojasPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState('all');
  const [locationType, setLocationType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', 'Vrat & Katha', 'Housewarming', 'Health & Protection', 'Astrological Remedies', 'Wealth & Prosperity', 'Shiva Worship', 'Obstacle Removal', 'Samskaras'];

  const filteredPoojas = useMemo(() => {
    return poojasData.filter((pooja) => {
      const matchesSearch =
        pooja.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pooja.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pooja.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || pooja.category === categoryFilter;

      const matchesPrice =
        maxPrice === 'all' || pooja.price <= parseInt(maxPrice);

      const matchesLocation =
        locationType === 'all' || pooja.locationType.includes(locationType);

      return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [searchTerm, categoryFilter, maxPrice, locationType, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setMaxPrice('all');
    setLocationType('all');
    setSortBy('featured');
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
          <Badge variant="saffron" size="sm">Pooja Marketplace</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-2">
            Sacred Poojas & Vedic Havans
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1">
            Browse our complete catalog of authentic Hindu rituals, complete with verified priest coordination and sacred samagri.
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
          placeholder="Search by pooja name, category, or occasion..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categories.map((c) => ({ label: c === 'all' ? 'All Categories' : c, value: c }))}
            placeholder={null}
          />
          <Select
            label="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            options={[
              { label: 'Any Price', value: 'all' },
              { label: 'Under ₹3,000', value: '3000' },
              { label: 'Under ₹4,000', value: '4000' },
              { label: 'Under ₹6,000', value: '6000' },
            ]}
            placeholder={null}
          />
          <Select
            label="Location Type"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            options={[
              { label: 'All Formats', value: 'all' },
              { label: 'At Home', value: 'Home' },
              { label: 'Temple', value: 'Temple' },
              { label: 'Online', value: 'Online' },
            ]}
            placeholder={null}
          />
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: 'Featured', value: 'featured' },
              { label: 'Price: Low to High', value: 'price-asc' },
              { label: 'Price: High to Low', value: 'price-desc' },
              { label: 'Highest Rated', value: 'rating' },
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
      ) : filteredPoojas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoojas.map((pooja) => (
            <PoojaCard
              key={pooja.id}
              title={pooja.title}
              description={pooja.shortDescription}
              duration={pooja.duration}
              price={pooja.price}
              rating={pooja.rating}
              reviewCount={pooja.reviewCount}
              location={pooja.locationType}
              tag={pooja.tag}
              onBookClick={() => addToast(`Booking initiated for ${pooja.title}`, 'success')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Poojas Found"
          description="No poojas matched your search filters. Try clearing your search query or selecting 'All Categories'."
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};

export default PoojasPage;
