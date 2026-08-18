import React, { useState, useEffect, useCallback } from 'react';
import { Landmark, MapPin, Clock, Info, RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { getTemples } from '../services/templeService.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const TemplesPage = () => {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedTemple, setSelectedTemple] = useState(null);

  const [temples, setTemples] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTemples = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        category: categoryFilter,
        page,
        limit: 9,
      };
      const result = await getTemples(params);
      if (result.success) {
        setTemples(result.data);
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch temples from API');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, categoryFilter, page]);

  useEffect(() => {
    fetchTemples();
  }, [fetchTemples]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="saffron" size="sm" icon={<Landmark className="w-3.5 h-3.5" />}>
            Sacred Pilgrimage Directory
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-2">
            Temple Directory & Archana Guide
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1">
            Explore prominent Hindu shrines across India, learn darshan timings, and discover future temple archana services.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={fetchTemples}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search temple by name, deity, or city..."
          value={searchTerm}
          onChange={(val) => { setSearchTerm(val); setPage(1); }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="Category / Tradition"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            options={[
              { label: 'All Shrines', value: 'all' },
              { label: 'Jyotirlinga', value: 'Jyotirlinga' },
              { label: 'Shakti Peeth', value: 'Shakti Peeth' },
              { label: 'Divya Desam', value: 'Divya Desam' },
              { label: 'Ganesh Kshetra', value: 'Ganesh Kshetra' },
            ]}
            placeholder={null}
          />
        </div>
      </div>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          title="Failed to Load Temples"
          description={error}
          onRetry={fetchTemples}
        />
      ) : temples.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map((temple) => (
              <Card key={temple._id || temple.id} hoverable className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="gray" size="sm">{temple.category}</Badge>
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {temple.city}, {temple.state}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    {temple.name}
                  </h3>

                  <div className="text-xs text-amber-900 font-medium bg-amber-50 px-2.5 py-1 rounded-md inline-block border border-amber-200/60">
                    Deity: {temple.deity}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {temple.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {temple.timings?.split(',')[0] || '06:00 AM - 09:00 PM'}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTemple(temple)}>
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
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
          title="No Temples Found"
          description="No temple entries matched your search criteria. Try clearing search filters."
          actionLabel="Clear Filters"
          onAction={handleResetFilters}
        />
      )}

      {/* Temple Detail Modal */}
      {selectedTemple && (
        <Modal
          isOpen={!!selectedTemple}
          onClose={() => setSelectedTemple(null)}
          title={selectedTemple.name}
          subtitle={`${selectedTemple.city}, ${selectedTemple.state} — ${selectedTemple.category}`}
          footerActions={
            <Button variant="primary" size="sm" onClick={() => {
              addToast(`Online Archana request noted for ${selectedTemple.name}`, 'success');
              setSelectedTemple(null);
            }}>
              Request Archana Info
            </Button>
          }
        >
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">Presiding Deity</span>
              <p className="text-sm font-semibold text-stone-800">{selectedTemple.deity}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">Darshan Hours</span>
              <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">{selectedTemple.timings}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">Overview</span>
              <p className="text-xs text-stone-600 leading-relaxed">{selectedTemple.description}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Future updates will enable remote e-archana and direct prasadam booking from verified temple trusts.</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TemplesPage;
