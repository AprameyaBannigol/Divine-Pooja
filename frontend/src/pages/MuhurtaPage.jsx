import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Sun, Clock, Info, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { getMuhurtas } from '../services/muhurtaService.js';
import { useToast } from '../components/feedback/ToastContext.jsx';
import { Link } from 'react-router-dom';

const MuhurtaPage = () => {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [muhurtas, setMuhurtas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', label: 'All Occasions' },
    { id: 'GRUHA_PRAVESH', label: 'Griha Pravesh' },
    { id: 'WEDDING', label: 'Marriage' },
    { id: 'NAMING_CEREMONY', label: 'Namakarana' },
    { id: 'BUSINESS', label: 'Business Launch' },
  ];

  const fetchMuhurtas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        type: selectedCategory === 'all' ? undefined : selectedCategory,
      };
      const result = await getMuhurtas(params);
      if (result.success) {
        setMuhurtas(result.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch Panchang muhurta data');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchMuhurtas();
  }, [fetchMuhurtas]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="recommended" size="sm" icon={<Sun className="w-3.5 h-3.5" />}>
            Vedic Panchang & Muhurta
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-2">
            Auspicious Muhurta Calendar
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1">
            Plan your sacred life milestones with auspicious time windows calculated according to traditional Hindu Panchang.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={fetchMuhurtas}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Sample Data Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-950 block">REST API & Panchang Dataset</span>
          <p className="leading-relaxed">
            Fetched live via Express REST API from MongoDB. Custom location-based real-time calculation engines will be integrated in future release phases.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          title="Failed to Load Muhurtas"
          description={error}
          onRetry={fetchMuhurtas}
        />
      ) : muhurtas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {muhurtas.map((m) => (
            <Card key={m._id || m.id} className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-serif">
                  {m.title}
                </span>
                <span className="text-xs bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full font-medium border border-amber-200">
                  {m.type}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100/70 border border-amber-300/80 flex flex-col items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold font-serif text-stone-900">
                    {new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">Auspicious Time Slot</span>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 font-bold text-stone-800">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Abhijit Muhurta: {m.abhijitMuhurta || '11:45 AM - 12:30 PM'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/60">
                  <div>Tithi: <strong className="text-stone-900">{m.tithi}</strong></div>
                  <div>Nakshatra: <strong className="text-stone-900">{m.nakshatra}</strong></div>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {m.description}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Priests Available
                </span>

                <Link to={`/poojas?search=${encodeURIComponent(m.type)}`}>
                  <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                    Book for this Date
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Muhurta Records Found"
          description="No auspicious date records matched your chosen occasion filter."
          actionLabel="View All Occasions"
          onAction={() => setSelectedCategory('all')}
        />
      )}
    </div>
  );
};

export default MuhurtaPage;
