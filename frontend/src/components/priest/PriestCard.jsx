import React from 'react';
import { MapPin, Award, Languages, CalendarCheck } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Rating from '../ui/Rating.jsx';
import Button from '../ui/Button.jsx';

const PriestCard = ({
  name = 'Pt. Ramesh Sharma',
  profileImage = null,
  isVerified = true,
  experience = '15+ yrs exp',
  languages = ['Sanskrit', 'Hindi', 'Kannada'],
  specialization = 'Griha Pravesh & Mahamrityunjay',
  location = 'Bengaluru, KA',
  rating = 4.95,
  reviewCount = 98,
  isAvailable = true,
  startingPrice = 2100,
  onViewProfile = null,
  onBookNow = null,
}) => {
  return (
    <Card hoverable className="flex flex-col h-full p-5 rounded-2xl relative">
      {/* Top Header Row */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar Placeholder */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 border-2 border-amber-300 flex items-center justify-center font-serif font-bold text-xl text-amber-900 shadow-xs overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span>{name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
            )}
          </div>
          {isAvailable && (
            <span
              className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
              title="Available Today"
            />
          )}
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base font-bold text-stone-900 font-serif truncate">
              {name}
            </h3>
            {isVerified && <Badge variant="verified" size="sm">Verified</Badge>}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-500 mb-1">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              {experience}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              {location}
            </span>
          </div>

          <Rating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>
      </div>

      {/* Specialization & Languages */}
      <div className="space-y-2 mb-4 text-xs text-stone-600 bg-stone-50/70 rounded-lg p-3 border border-stone-100 flex-1">
        <div>
          <span className="font-semibold text-stone-700 block mb-0.5">Specialization:</span>
          <span className="text-stone-600">{specialization}</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="truncate">{languages.join(' • ')}</span>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-stone-500 block">Dakshina from</span>
          <span className="text-base font-bold text-stone-900">
            ₹{startingPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            Profile
          </Button>
          <Button variant="primary" size="sm" onClick={onBookNow}>
            Book
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PriestCard;
