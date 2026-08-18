import React, { useState, useMemo } from 'react';
import { Landmark, MapPin, Clock, Info } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import { templesData } from '../data/temples.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const TemplesPage = () => {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTemple, setSelectedTemple] = useState(null);

  const filteredTemples = useMemo(() => {
    return templesData.filter((temple) => {
      const matchesSearch =
        temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temple.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temple.deity.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || temple.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
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

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search temple by name, deity, or city..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <Select
            label="Category / Tradition"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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

      {/* Grid */}
      {filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemples.map((temple) => (
            <Card key={temple.id} hoverable className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200">
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
                  {temple.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {temple.darshanTimings.split(',')[0]}
                </span>
                <Button variant="outline" size="sm" onClick={() => setSelectedTemple(temple)}>
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Temples Found"
          description="No temple entries matched your search criteria. Try clearing search filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setCategoryFilter('all');
          }}
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
              <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">{selectedTemple.darshanTimings}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">Overview</span>
              <p className="text-xs text-stone-600 leading-relaxed">{selectedTemple.shortDescription}</p>
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
