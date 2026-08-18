import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Info, Sun } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { muhurtasData } from '../../data/muhurtas.js';

const MuhurtaPreviewSection = () => {
  const upcomingMuhurtas = muhurtasData.slice(0, 3);

  return (
    <section className="space-y-8 bg-amber-50/40 p-6 sm:p-8 rounded-3xl border border-amber-200/60">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <Badge variant="recommended" size="sm" icon={<Sun className="w-3.5 h-3.5" />}>
            Panchang & Auspicious Dates
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-2">
            Upcoming Auspicious Muhurtas
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mt-1">
            Discover optimal planetary time windows calculated according to traditional Vedic Panchang.
          </p>
        </div>

        <Link to="/muhurta" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Full Calendar
          </Button>
        </Link>
      </div>

      {/* Development Sample Data Notice */}
      <div className="bg-amber-100/70 border border-amber-300/80 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Development Preview: Displayed dates are sample Vedic records. Final Panchang calculation APIs will be integrated in future phases.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingMuhurtas.map((m) => (
          <Card key={m.id} hoverable className="flex flex-col justify-between p-5 rounded-2xl bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-serif">
                  {m.occasion}
                </span>
                <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-600 font-medium">
                  {m.day}
                </span>
              </div>

              <div className="flex items-center gap-2 text-lg font-extrabold text-stone-900">
                <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{m.displayDate}</span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Auspicious Window: {m.auspiciousWindow}</span>
                </div>
                <div className="text-stone-500">
                  <span>Tithi: <strong>{m.tithi}</strong></span> • <span>Nakshatra: <strong>{m.nakshatra}</strong></span>
                </div>
                <p className="text-stone-500 line-clamp-2 leading-relaxed pt-1">
                  {m.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100">
              <Link to={`/poojas?occasion=${encodeURIComponent(m.occasion)}`}>
                <Button variant="outline" size="sm" fullWidth>
                  Check Available Priests
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MuhurtaPreviewSection;
