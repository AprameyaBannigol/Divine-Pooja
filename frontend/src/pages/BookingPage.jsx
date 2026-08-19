import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Lock,
  ArrowRight,
  PackageCheck,
  ChevronLeft,
} from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Rating from '../components/ui/Rating.jsx';
import Button from '../components/ui/Button.jsx';
import BookingStepper from '../components/booking/BookingStepper.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';
import LoadingSkeleton from '../components/feedback/LoadingSkeleton.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import { getPoojaById } from '../services/poojaService.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const BookingPage = () => {
  const { poojaId } = useParams();
  const { addToast } = useToast();

  const [pooja, setPooja] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPooja = useCallback(async () => {
    if (!poojaId) {
      setError('Missing pooja ID parameter');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await getPoojaById(poojaId);
      if (res.success && res.data) {
        setPooja(res.data);
      } else {
        setError('Pooja details could not be loaded');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch pooja details from database';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [poojaId]);

  useEffect(() => {
    fetchPooja();
  }, [fetchPooja]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-8 sm:py-12 space-y-8">
        <LoadingSkeleton className="h-16 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton className="h-48 w-full rounded-3xl" />
            <LoadingSkeleton className="h-64 w-full rounded-3xl" />
          </div>
          <div>
            <LoadingSkeleton className="h-80 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <ErrorState
          title="Booking Flow Error"
          description={error}
          onRetry={fetchPooja}
        />
        <div className="mt-6 text-center">
          <Link to="/poojas">
            <Button variant="outline" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Return to Pooja Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!pooja) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <EmptyState
          title="Pooja Not Found"
          description="The requested pooja ritual could not be found or is no longer active in our marketplace."
          actionLabel="Browse Available Poojas"
          onAction={() => window.location.href = '/poojas'}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-8">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/poojas"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Pooja Marketplace</span>
        </Link>
        <Badge variant="saffron" size="sm">
          Booking Engine v1.0
        </Badge>
      </div>

      {/* Stepper Progress Header */}
      <BookingStepper currentStep={1} />

      {/* Main 2-Column Booking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Step 1 Functional View + Step 2-5 Locked Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: POOJA SELECTION & DETAILS (Active) */}
          <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-stone-900">
                    Selected Ritual Details
                  </h2>
                  <p className="text-xs text-stone-500">Step 1 of 5 — Review ceremony specifications</p>
                </div>
              </div>
              <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                Selected
              </Badge>
            </div>

            {/* Pooja Overview */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {pooja.categories?.map((cat, idx) => (
                  <Badge key={idx} variant="stone" size="sm">
                    {cat}
                  </Badge>
                ))}
                {pooja.occasion && (
                  <Badge variant="saffron" size="sm">
                    {pooja.occasion}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
                {pooja.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
                <Rating rating={pooja.rating || 4.9} reviewCount={pooja.reviewCount || 0} size="sm" />
                <span className="text-stone-300">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Duration: {pooja.duration || '2-3 hrs'}</span>
                </div>
                <span className="text-stone-300">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Available in: {pooja.cities?.join(', ') || 'All Major Cities'}</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900 block font-serif">Ceremony Overview:</span>
              <p>{pooja.description || pooja.shortDescription}</p>
            </div>

            {/* Priest & Samagri Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>Priest Requirements</span>
                </div>
                <p className="text-xs text-amber-800 font-medium">
                  {pooja.priestRequirements || 'Vedic Certified Priest'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <PackageCheck className="w-4 h-4 text-amber-700" />
                  <span>Samagri & Setup</span>
                </div>
                <p className="text-xs text-amber-800 font-medium">
                  Complete Pooja Kit Provided
                </p>
              </div>
            </div>

            {/* Included Materials */}
            {pooja.materials && pooja.materials.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-stone-900 font-serif block">
                  Included Samagri Items ({pooja.materials.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {pooja.materials.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 Completion Footer */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <span>Base Price: </span>
                <span className="text-base font-extrabold text-stone-900">
                  ₹{Number(pooja.price || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto cursor-not-allowed opacity-80"
                isDisabled={true}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Date & Priest (Step 2)
              </Button>
            </div>
            <p className="text-[11px] text-amber-800 text-center sm:text-right font-medium">
              * Step 1 Complete. Date & Priest selection will be enabled in WORK 5B.2.
            </p>
          </Card>

          {/* STEP 2-5 UI PLACEHOLDERS (Non-functional placeholders for structure) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
              Upcoming Booking Steps
            </h3>

            {/* Step 2 Placeholder */}
            <Card className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-800">Date & Priest Selection</h4>
                  <p className="text-xs text-stone-500">Choose auspicious date, priest & available time slot</p>
                </div>
              </div>
              <Badge variant="stone" size="sm" icon={<Lock className="w-3 h-3" />}>
                Locked (Step 2)
              </Badge>
            </Card>

            {/* Step 3 Placeholder */}
            <Card className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-800">Location & Address</h4>
                  <p className="text-xs text-stone-500">Provide venue address, city & pincode</p>
                </div>
              </div>
              <Badge variant="stone" size="sm" icon={<Lock className="w-3 h-3" />}>
                Locked (Step 3)
              </Badge>
            </Card>

            {/* Step 4 Placeholder */}
            <Card className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-800">Devotee Details (Sankalp)</h4>
                  <p className="text-xs text-stone-500">Name, phone, gotra & special instructions</p>
                </div>
              </div>
              <Badge variant="stone" size="sm" icon={<Lock className="w-3 h-3" />}>
                Locked (Step 4)
              </Badge>
            </Card>

            {/* Step 5 Placeholder */}
            <Card className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-800">Review & Confirm</h4>
                  <p className="text-xs text-stone-500">Final booking summary & creation</p>
                </div>
              </div>
              <Badge variant="stone" size="sm" icon={<Lock className="w-3 h-3" />}>
                Locked (Step 5)
              </Badge>
            </Card>
          </div>
        </div>

        {/* Right Column: Booking Summary Card */}
        <div>
          <BookingSummary pooja={pooja} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
