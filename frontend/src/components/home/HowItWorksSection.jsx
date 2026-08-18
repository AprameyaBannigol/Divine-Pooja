import React from 'react';
import { Sparkles, UserCheck, CalendarCheck, ShieldCheck } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose a Pooja',
      description: 'Select from a wide catalog of sacred Vedic poojas, havans, and home ceremonies tailored to your occasion.',
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
    },
    {
      number: '02',
      title: 'Select Verified Priest',
      description: 'Browse background-verified Acharyas, view language fluency, experience, and authentic devotee ratings.',
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      number: '03',
      title: 'Pick Auspicious Date',
      description: 'Consult Panchang muhurta recommendations or choose your convenient date and home/online service time.',
      icon: <CalendarCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      number: '04',
      title: 'Book & Pay Securely',
      description: 'Transparent Dakshina with complete puja samagri arrangements. Receive instant confirmation and priest details.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="saffron" size="sm">Simple & Transparent</Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
          How Divine Pooja Works
        </h2>
        <p className="text-sm text-stone-500">
          Four effortless steps from ritual discovery to divine blessings in your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between relative group hover:border-amber-400 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-2xl font-black font-serif text-stone-300 group-hover:text-amber-500 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-base font-bold font-serif text-stone-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
