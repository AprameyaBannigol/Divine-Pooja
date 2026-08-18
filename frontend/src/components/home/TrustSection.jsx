import React from 'react';
import { ShieldCheck, CircleDollarSign, PackageCheck, Clock } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const TrustSection = () => {
  const pillars = [
    {
      title: 'Verified Priests',
      description: 'Priests are selected based on Vedic education, ritual experience, and community verification.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-700" />,
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear upfront pricing with no hidden charges or last-minute surprise demands.',
      icon: <CircleDollarSign className="w-6 h-6 text-amber-700" />,
    },
    {
      title: 'Complete Samagri Options',
      description: 'Choose all-inclusive packages containing authentic flowers,havan items, and sacred herbs.',
      icon: <PackageCheck className="w-6 h-6 text-amber-700" />,
    },
    {
      title: 'Punctual & Devotional',
      description: 'Priests arrive on schedule with full commitment to authentic Vedic procedures.',
      icon: <Clock className="w-6 h-6 text-amber-700" />,
    },
  ];

  return (
    <section className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 space-y-8 border border-stone-800">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="recommended" size="sm">Our Platform Commitment</Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
          Why Devotees Trust Divine Pooja
        </h2>
        <p className="text-sm text-stone-400">
          Built to combine sacred reverence with modern convenience and reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, index) => (
          <div key={index} className="bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              {p.icon}
            </div>
            <h3 className="text-base font-bold font-serif text-white">
              {p.title}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
