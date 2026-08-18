import React from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Rating from '../ui/Rating.jsx';
import Button from '../ui/Button.jsx';

const PoojaCard = ({
  title = 'Satyanarayan Pooja & Katha',
  description = 'Complete traditional Satyanarayan Pooja performed by experienced Vedic priests for peace, prosperity and family well-being.',
  image = null,
  duration = '2.5 - 3 hrs',
  price = 2500,
  rating = 4.9,
  reviewCount = 142,
  location = 'At Home / Online',
  tag = 'Popular',
  onBookClick = null,
}) => {
  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden p-0 rounded-2xl group">
      {/* Card Image / Placeholder Surface */}
      <div className="relative h-48 w-full bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100 overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-amber-800/80">
            <div className="w-12 h-12 rounded-full bg-amber-200/60 flex items-center justify-center mb-2 shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-xs font-serif tracking-widest uppercase font-semibold text-amber-900/60">
              Vedic Ceremony
            </span>
          </div>
        )}

        {tag && (
          <div className="absolute top-3 left-3">
            <Badge variant="saffron" size="sm">
              {tag}
            </Badge>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs text-xs font-medium text-stone-700 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-600" />
          <span>{location}</span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <Rating rating={rating} reviewCount={reviewCount} size="sm" />
          <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{duration}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-700 transition-colors mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-500 block">Starting from</span>
            <span className="text-lg font-extrabold text-stone-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onBookClick}
          >
            Book Pooja
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PoojaCard;
