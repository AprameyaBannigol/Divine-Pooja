import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, MapPin, ArrowRight, Clock } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { templesData } from '../../data/temples.js';

const TemplePreviewSection = () => {
  const featuredTemples = templesData.slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <Badge variant="saffron" size="sm" icon={<Landmark className="w-3.5 h-3.5" />}>
            Temple Directory
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-2">
            Explore Sacred Temples
          </h2>
          <p className="text-sm text-stone-500 max-w-xl mt-1">
            Discover historic pilgrimage destinations, darshan timings, and future temple archana services.
          </p>
        </div>

        <Link to="/temples" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Temples
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredTemples.map((temple) => (
          <Card key={temple.id} hoverable className="flex flex-col justify-between p-5 rounded-2xl bg-white">
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

              <div className="text-xs text-amber-800 font-medium bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                Deity: {temple.deity}
              </div>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {temple.shortDescription}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {temple.darshanTimings.split(',')[0]}
              </span>
              <Link to="/temples">
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TemplePreviewSection;
