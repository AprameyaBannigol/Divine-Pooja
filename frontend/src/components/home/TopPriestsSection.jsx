import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import PriestCard from '../priest/PriestCard.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { priestsData } from '../../data/priests.js';
import { useToast } from '../feedback/ToastContext.jsx';

const TopPriestsSection = () => {
  const { addToast } = useToast();
  const topPriests = priestsData.slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Verified Acharyas
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-2">
            Top-Rated Vedic Priests
          </h2>
          <p className="text-sm text-stone-500 max-w-xl mt-1">
            Certified Gurus and Acharyas with proven Vedic lineage, background verification, and high devotee ratings.
          </p>
        </div>

        <Link to="/priests" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All Priests
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPriests.map((priest) => (
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
    </section>
  );
};

export default TopPriestsSection;
