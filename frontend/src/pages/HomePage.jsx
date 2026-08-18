import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Phone, Calendar, Clock, Bell, Info } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Textarea from '../components/ui/Textarea.jsx';
import Badge from '../components/ui/Badge.jsx';
import Rating from '../components/ui/Rating.jsx';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import Modal from '../components/ui/Modal.jsx';
import PoojaCard from '../components/pooja/PoojaCard.jsx';
import PriestCard from '../components/priest/PriestCard.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';
import { CardSkeleton, TextSkeleton, AvatarSkeleton, Spinner } from '../components/feedback/LoadingSkeleton.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';

const HomePage = () => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="space-y-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <Badge variant="saffron" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Production Design System
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-amber-100 leading-tight">
            Divine Pooja Booking Foundation
          </h1>
          <p className="text-base sm:text-lg text-amber-200/80 leading-relaxed">
            Unified visual identity, design tokens, typography scale, responsive layout foundations, and 15+ production-grade UI components for the sacred services marketplace.
          </p>
        </div>
      </section>

      {/* 1. Typography Hierarchy */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">1. Typography Hierarchy</h2>
          <p className="text-sm text-stone-500">Google Fonts: Cinzel (Serif Display) & Plus Jakarta Sans (Sans-serif UI)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">Display Heading (font-serif)</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-stone-900">
              Authentic Vedic Poojas & Priests
            </h1>
          </div>
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">H1 Heading (font-serif)</span>
            <h1 className="text-3xl font-bold font-serif text-stone-900">
              Griha Pravesh & Vastu Shanti Rituals
            </h1>
          </div>
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">H2 Heading (font-serif)</span>
            <h2 className="text-2xl font-bold font-serif text-stone-800">
              Verified Vedic Priests in Bengaluru
            </h2>
          </div>
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">H3 Heading (font-serif)</span>
            <h3 className="text-lg font-bold font-serif text-stone-800">
              Book Pooja Online with Samagri
            </h3>
          </div>
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">Body Text (font-sans)</span>
            <p className="text-base text-stone-700 leading-relaxed max-w-2xl">
              Select your preferred muhurta, language, and certified priest for sacred ceremonies at home or performed remotely at holy temples.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-stone-400 block mb-1">Small Text & Labels</span>
            <p className="text-xs text-stone-500 font-medium">
              * Includes complete puja samagri, travel, and prasad delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Button System */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">2. Button Component</h2>
          <p className="text-sm text-stone-500">Variants: Primary, Secondary, Outline, Ghost, Destructive & States</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-stone-100">
            <Button variant="primary" size="sm">Small Size</Button>
            <Button variant="primary" size="md">Medium Size</Button>
            <Button variant="primary" size="lg">Large Size</Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-stone-100">
            <Button variant="primary" isLoading>Loading State</Button>
            <Button variant="primary" isDisabled>Disabled Button</Button>
            <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>With Left Icon</Button>
            <Button variant="outline" rightIcon={<Sparkles className="w-4 h-4" />}>With Right Icon</Button>
          </div>
        </div>
      </section>

      {/* 3. Form Controls System */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">3. Form Controls</h2>
          <p className="text-sm text-stone-500">Input, Select, Textarea & SearchBar</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-mono text-stone-400 block mb-2">SearchBar Component</span>
            <SearchBar
              placeholder="Search poojas (e.g. Satyanarayan), priests, or location..."
              value={searchVal}
              onChange={setSearchVal}
              onSearch={(q) => addToast(`Searching for: ${q}`, 'info')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="e.g. Aditi Sharma"
              helperText="Enter your name as per identity records"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="aditi@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Mobile Number"
              type="phone"
              placeholder="+91 98765 43210"
              leftIcon={<Phone className="w-4 h-4" />}
            />
            <Input
              label="Pooja Date"
              type="date"
              leftIcon={<Calendar className="w-4 h-4" />}
            />
            <Input
              label="Pooja Time"
              type="time"
              leftIcon={<Clock className="w-4 h-4" />}
            />
            <Select
              label="Select City / Region"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              options={[
                { label: 'Bengaluru', value: 'bengaluru' },
                { label: 'Mumbai', value: 'mumbai' },
                { label: 'Delhi NCR', value: 'delhi' },
                { label: 'Hyderabad', value: 'hyderabad' },
              ]}
              helperText="Available for in-person home visits"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            <Input
              label="Error State Input"
              value="Invalid Input Value"
              error="Please enter a valid address"
            />
            <Input
              label="Disabled Input"
              value="Readonly System Identifier"
              isDisabled
            />
          </div>

          <Textarea
            label="Special Ritual Instructions"
            placeholder="Mention any specific gothra, nakshatra, or samagri preferences..."
          />
        </div>
      </section>

      {/* 4. Badges & Rating System */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">4. Badges & Rating System</h2>
          <p className="text-sm text-stone-500">Status tags and review score displays</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="verified">Verified Priest</Badge>
            <Badge variant="available">Available Today</Badge>
            <Badge variant="popular">Popular Ceremony</Badge>
            <Badge variant="recommended">Top Choice</Badge>
            <Badge variant="pending">Booking Pending</Badge>
            <Badge variant="new">New Service</Badge>
            <Badge variant="saffron">Vedic Certified</Badge>
            <Badge variant="gray">Standard Package</Badge>
          </div>

          <div className="flex flex-wrap gap-8 items-center pt-4 border-t border-stone-100">
            <div>
              <span className="text-xs text-stone-400 block mb-1">Small Rating</span>
              <Rating rating={4.9} reviewCount={124} size="sm" />
            </div>
            <div>
              <span className="text-xs text-stone-400 block mb-1">Medium Rating</span>
              <Rating rating={4.8} reviewCount={89} size="md" />
            </div>
            <div>
              <span className="text-xs text-stone-400 block mb-1">Large Rating</span>
              <Rating rating={5.0} reviewCount={310} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Domain Cards (PoojaCard & PriestCard) */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">5. Domain Cards Foundation</h2>
          <p className="text-sm text-stone-500">Reusable PoojaCard and PriestCard components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PoojaCard
            title="Griha Pravesh Pooja"
            description="Auspicious housewarming ritual with Vastu Shanti, Navagraha Havan and Ganesh Pujan."
            duration="3.5 - 4 hrs"
            price={5100}
            rating={4.95}
            reviewCount={210}
            tag="Top Booked"
            onBookClick={() => addToast('Pooja booking modal triggered', 'success')}
          />
          <PoojaCard
            title="Maha Mrityunjaya Jaap"
            description="Sacred Vedic chanting ritual for health, longevity, protection and spiritual energy."
            duration="2 hrs"
            price={3500}
            rating={4.88}
            reviewCount={95}
            tag="Health & Protection"
            onBookClick={() => addToast('Pooja booking modal triggered', 'success')}
          />
          <PriestCard
            name="Pt. Ananthakrishna Shastri"
            experience="18+ yrs exp"
            languages={['Sanskrit', 'Kannada', 'English']}
            specialization="Griha Pravesh & Navagraha Havan"
            location="Indiranagar, Bengaluru"
            rating={4.98}
            reviewCount={184}
            startingPrice={3100}
            onViewProfile={() => addToast('Viewing Priest Profile', 'info')}
            onBookNow={() => addToast('Booking Priest Now', 'success')}
          />
        </div>
      </section>

      {/* 6. Feedback & Interactive Modals */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-stone-900">6. Feedback & Dialog System</h2>
          <p className="text-sm text-stone-500">Toast notifications, accessible Modals, Skeletons, Empty & Error states</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6 shadow-xs">
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Launch Accessible Modal
            </Button>
            <Button variant="primary" onClick={() => addToast('Pooja slot reserved successfully!', 'success')}>
              Trigger Success Toast
            </Button>
            <Button variant="destructive" onClick={() => addToast('Unable to process request. Try again.', 'error')}>
              Trigger Error Toast
            </Button>
            <Button variant="secondary" onClick={() => addToast('Pooja requires 24hr advance notice.', 'warning')}>
              Trigger Warning Toast
            </Button>
          </div>

          {/* Skeletons */}
          <div className="pt-6 border-t border-stone-100">
            <h3 className="text-sm font-bold font-serif text-stone-800 mb-4">Loading Skeleton Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CardSkeleton />
              <div className="bg-white p-5 border border-stone-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <AvatarSkeleton size="md" />
                  <div className="flex-1">
                    <TextSkeleton lines={2} />
                  </div>
                </div>
                <TextSkeleton lines={3} />
              </div>
              <div className="bg-white p-5 border border-stone-200 rounded-2xl flex flex-col items-center justify-center gap-3 min-h-[200px]">
                <Spinner size="lg" />
                <span className="text-xs text-stone-500 font-medium">Loading spiritual data...</span>
              </div>
            </div>
          </div>

          {/* Empty & Error States */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
            <EmptyState
              title="No Priests Available in Search Area"
              description="We couldn’t find any verified priests matching your chosen date and location."
              actionLabel="Reset Search Filters"
              onAction={() => addToast('Filters reset', 'info')}
            />
            <ErrorState
              title="Network Connection Failed"
              description="Could not connect to Divine Pooja API server. Please check your internet connection."
              onRetry={() => addToast('Retrying API connection...', 'info')}
            />
          </div>
        </div>
      </section>

      {/* Accessible Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Pooja Booking"
        subtitle="Step 1 of 3 — Ritual Selection"
        footerActions={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => {
              addToast('Proceeding to Priest Selection', 'success');
              setIsModalOpen(false);
            }}>
              Continue
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-stone-700 leading-relaxed">
            You are initiating a booking for <strong>Griha Pravesh Pooja</strong>. All Vedic samagri and verified priest coordination are included in your package.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              This modal foundation includes focus trap, background scroll lock, backdrop blur, close action, and keyboard <kbd className="px-1 py-0.5 bg-amber-100 rounded border border-amber-300">Esc</kbd> key support.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
