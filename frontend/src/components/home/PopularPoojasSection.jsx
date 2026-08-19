import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import PoojaCard from '../pooja/PoojaCard.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { CardSkeleton } from '../feedback/LoadingSkeleton.jsx';
import { getPoojas } from '../../services/poojaService.js';
import { poojasData as fallbackPoojas } from '../../data/poojas.js';

const PopularPoojasSection = () => {
  const [poojas, setPoojas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPopular = async () => {
      try {
        const res = await getPoojas({ limit: 3, sortBy: 'featured' });
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setPoojas(res.data);
        } else if (isMounted) {
          setPoojas(fallbackPoojas.slice(0, 3));
        }
      } catch (err) {
        if (isMounted) {
          setPoojas(fallbackPoojas.slice(0, 3));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPopular();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <Badge variant="saffron" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Vedic Ceremonies
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-2">
            Popular Poojas & Havans
          </h2>
          <p className="text-sm text-stone-500 max-w-xl mt-1">
            Handpicked sacred ceremonies conducted by experienced pandits with complete samagri arrangements.
          </p>
        </div>

        <Link to="/poojas" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All Poojas
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poojas.map((pooja) => (
            <PoojaCard
              key={pooja._id || pooja.id}
              id={pooja._id || pooja.id}
              title={pooja.name || pooja.title}
              description={pooja.shortDescription}
              duration={pooja.duration}
              price={pooja.price}
              rating={pooja.rating}
              reviewCount={pooja.reviewCount}
              location={pooja.cities?.join(', ') || pooja.locationType || 'At Home / Online'}
              tag={pooja.occasion || pooja.tag || 'Popular'}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularPoojasSection;
