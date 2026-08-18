import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PoojaCard from '../components/pooja/PoojaCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { getPoojas } from '../services/poojaService.js';
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
  const [page, setPage] = useState(1);

  const [poojas, setPoojas] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'Vrat & Katha', 'Housewarming', 'Health & Protection', 'Astrological Remedies', 'Wealth & Prosperity', 'Shiva Worship', 'Obstacle Removal', 'Samskaras'];

  const fetchPoojas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        category: categoryFilter,
        maxPrice,
        location: locationType,
        sortBy,
        page,
        limit: 9,
      };
      const result = await getPoojas(params);
      if (result.success) {
        setPoojas(result.data);
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch poojas from API');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, categoryFilter, maxPrice, locationType, sortBy, page]);

  useEffect(() => {
    fetchPoojas();
  }, [fetchPoojas]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setMaxPrice('all');
    setLocationType('all');
    setSortBy('featured');
    setPage(1);
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
            Browse our complete catalog of authentic Hindu rituals, backed by Express REST API and MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={fetchPoojas}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search by pooja name, category, or occasion..."
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="Category"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            options={categories.map((c) => ({ label: c === 'all' ? 'All Categories' : c, value: c }))}
            placeholder={null}
          />
          <Select
            label="Max Price"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
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
            onChange={(e) => { setLocationType(e.target.value); setPage(1); }}
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
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
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

      {/* States: Loading / Error / Data / Empty */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          title="Failed to Load Poojas"
          description={error}
          onRetry={fetchPoojas}
        />
      ) : poojas.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poojas.map((pooja) => (
              <PoojaCard
                key={pooja._id || pooja.id}
                title={pooja.name || pooja.title}
                description={pooja.shortDescription}
                duration={pooja.duration}
                price={pooja.price}
                rating={pooja.rating}
                reviewCount={pooja.reviewCount}
                location={pooja.cities?.join(', ') || 'At Home / Online'}
                tag={pooja.occasion || 'Popular'}
                onBookClick={() => addToast(`Booking initiated for ${pooja.name}`, 'success')}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-stone-200 pt-6">
              <span className="text-xs text-stone-500">
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  isDisabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  isDisabled={page >= pagination.pages}
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
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
