import React from 'react';
import { Check, Sparkles, Calendar, MapPin, UserCheck, ShieldCheck } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Pooja', icon: Sparkles, description: 'Select Ritual' },
  { id: 2, label: 'Date & Priest', icon: Calendar, description: 'Schedule Slot' },
  { id: 3, label: 'Location', icon: MapPin, description: 'Address Details' },
  { id: 4, label: 'Devotee Details', icon: UserCheck, description: 'Sankalp Info' },
  { id: 5, label: 'Review', icon: ShieldCheck, description: 'Final Summary' },
];

const BookingStepper = ({ currentStep = 1 }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs">
      <nav aria-label="Booking Progress">
        <ol className="flex items-center justify-between w-full relative gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <li className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                      isCompleted
                        ? 'bg-amber-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md ring-4 ring-amber-100'
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-stone-400'}`} />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-bold font-serif whitespace-nowrap ${
                        isCurrent
                          ? 'text-amber-900'
                          : isCompleted
                          ? 'text-stone-800'
                          : 'text-stone-400'
                      }`}
                    >
                      Step {step.id}: {step.label}
                    </span>
                    <span className="text-[10px] text-stone-400 hidden lg:block whitespace-nowrap">
                      {step.description}
                    </span>
                  </div>
                </li>

                {/* Connector Line between steps */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 min-w-4 sm:min-w-8 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-amber-500' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BookingStepper;
