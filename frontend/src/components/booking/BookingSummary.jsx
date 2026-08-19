import React from 'react';
import { Clock, ShieldCheck, Info, Sparkles } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

const BookingSummary = ({ pooja = null }) => {
  if (!pooja) return null;

  const basePrice = Number(pooja.price || 0);

  return (
    <Card className="p-6 rounded-3xl bg-white border border-stone-200 shadow-md space-y-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold font-serif text-stone-900">Booking Summary</h3>
        </div>
        <Badge variant="saffron" size="sm">
          Informational
        </Badge>
      </div>

      {/* Selected Pooja Brief */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
          Selected Ceremony
        </span>
        <h4 className="text-base font-bold font-serif text-stone-900 leading-snug">
          {pooja.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Duration: {pooja.duration || '2-3 hrs'}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="pt-4 border-t border-stone-100 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600">Pooja Dakshina (Base)</span>
          <span className="font-semibold text-stone-900">₹{basePrice.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-stone-500">
          <span>Samagri & Setup</span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Included
          </span>
        </div>

        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <span className="text-base font-extrabold text-stone-900 font-serif">Base Amount</span>
          <span className="text-xl font-black text-amber-700">
            ₹{basePrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900/90 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          The displayed price is derived from our official database. Final booking total is calculated and verified server-side.
        </p>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-stone-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Strict Backend Price Snapshot & Verification</span>
      </div>
    </Card>
  );
};

export default BookingSummary;
