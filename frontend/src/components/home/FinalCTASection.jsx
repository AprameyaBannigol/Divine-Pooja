import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, UserCheck } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-800 via-amber-700 to-stone-900 text-white p-8 sm:p-12 text-center shadow-xl border border-amber-600/40">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <div className="flex justify-center">
          <Badge variant="saffron" size="sm" icon={<Flame className="w-3.5 h-3.5 fill-amber-200" />}>
            Authentic Vedic Services
          </Badge>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Begin Your Sacred Journey Today
        </h2>

        <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans">
          Connect with verified priests, discover auspicious muhurtas, and bring divine peace to your home and family.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link to="/poojas">
            <Button variant="primary" size="lg" leftIcon={<Sparkles className="w-5 h-5" />}>
              Explore Poojas
            </Button>
          </Link>
          <Link to="/priests">
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-amber-300/40 hover:bg-white/20 hover:text-white" leftIcon={<UserCheck className="w-5 h-5" />}>
              Find a Priest
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
