import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Flame, CalendarCheck, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-amber-800/40 shadow-2xl">
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <Badge variant="saffron" size="sm" icon={<Flame className="w-3.5 h-3.5 fill-amber-200" />}>
            Authentic Vedic Services Platform
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-amber-50 leading-[1.15]">
            Book Verified Priests for Sacred Rituals
          </h1>

          <p className="text-base sm:text-lg text-amber-200/90 leading-relaxed font-sans max-w-2xl">
            Find trusted Vedic priests, discover auspicious muhurtas, and book hassle-free poojas with complete samagri for your home, office, or temple.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link to="/poojas">
              <Button variant="primary" size="lg" leftIcon={<Sparkles className="w-5 h-5" />}>
                Explore Poojas
              </Button>
            </Link>
            <Link to="/priests">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-amber-300/40 hover:bg-white/20 hover:text-white">
                Find a Priest
              </Button>
            </Link>
          </div>

          {/* Quick Value Indicators */}
          <div className="pt-6 border-t border-amber-800/50 grid grid-cols-3 gap-4 text-xs sm:text-sm text-amber-200/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Vedic Priests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Samagri Included</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero Card Accent */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 space-y-6 shadow-xl relative">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
                  <Flame className="w-7 h-7 fill-amber-200" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-amber-100">
                    Griha Pravesh Pooja
                  </h3>
                  <span className="text-xs text-amber-300/80">Most Booked Ritual</span>
                </div>
              </div>
              <Badge variant="available" size="sm">Available</Badge>
            </div>

            <div className="space-y-3 text-xs text-amber-200/90">
              <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Verified Acharya Assigned
                </span>
                <span className="font-bold text-white">Included</span>
              </div>
              <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-amber-400" />
                  Panchang Muhurta Check
                </span>
                <span className="font-bold text-white">Included</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider block">Total Dakshina</span>
                <span className="text-2xl font-extrabold text-white">₹5,100</span>
              </div>
              <Link to="/poojas">
                <Button variant="primary" size="sm">
                  Quick Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
