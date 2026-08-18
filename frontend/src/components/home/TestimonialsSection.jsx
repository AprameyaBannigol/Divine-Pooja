import React from 'react';
import { Quote, Star } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { testimonialsData } from '../../data/testimonials.js';

const TestimonialsSection = () => {
  return (
    <section className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="saffron" size="sm">Devotee Experiences</Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
          What Devotees Say
        </h2>
        <p className="text-sm text-stone-500">
          Sample feedback from families who booked Vedic services through our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-amber-500">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-amber-200 shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold font-serif text-stone-900 block">{item.name}</span>
                <span className="text-stone-500">{item.location}</span>
              </div>
              <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-medium text-[10px]">
                {item.serviceBooked}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
