import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PriestCard from '../components/priest/PriestCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { getPriests } from '../services/priestService.js';
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
  const [page, setPage] = useState(1);

  const [priests, setPriests] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPriests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        city: cityFilter,
        language: languageFilter,
        sortBy,
        page,
        limit: 9,
      };
      const result = await getPriests(params);
      if (result.success) {
        setPriests(result.data);
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch priests from API');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, cityFilter, languageFilter, sortBy, page]);

  useEffect(() => {
    fetchPriests();
  }, [fetchPriests]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setLanguageFilter('all');
    setSortBy('rating');
    setPage(1);
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
            Connect with background-verified pandits and acharyas trained in authentic Vedic traditions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={fetchPriests}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search priest by name, city, or ritual specialization..."
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="City"
            value={cityFilter}
            onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
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
            onChange={(e) => { setLanguageFilter(e.target.value); setPage(1); }}
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
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            options={[
              { label: 'Highest Rated', value: 'rating' },
              { label: 'Dakshina: Low to High', value: 'price-asc' },
              { label: 'Dakshina: High to Low', value: 'price-desc' },
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
          title="Failed to Load Priests"
          description={error}
          onRetry={fetchPriests}
        />
      ) : priests.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priests.map((priest) => (
              <PriestCard
                key={priest._id || priest.id}
                name={priest.name}
                isVerified={priest.verificationStatus === 'APPROVED'}
                experience={priest.experience}
                languages={priest.languages}
                specialization={priest.specializations || priest.specialization}
                location={priest.city || priest.location}
                rating={priest.rating}
                reviewCount={priest.reviewCount}
                isAvailable={priest.availability}
                startingPrice={priest.startingPrice}
                onViewProfile={() => addToast(`Viewing profile of ${priest.name}`, 'info')}
                onBookNow={() => addToast(`Booking pandit ${priest.name}`, 'success')}
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
