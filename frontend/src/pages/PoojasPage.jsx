import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PoojaCard from '../components/pooja/PoojaCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';

const PoojasPage = () => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const poojasList = [
    {
      id: 1,
      title: 'Satyanarayan Pooja & Katha',
      description: 'Traditional Satyanarayan Pooja performed by experienced Vedic priests for peace and prosperity.',
      duration: '2.5 - 3 hrs',
      price: 2500,
      rating: 4.9,
      reviewCount: 142,
      location: 'At Home / Online',
      tag: 'Popular',
    },
    {
      id: 2,
      title: 'Griha Pravesh & Vastu Havan',
      description: 'Auspicious housewarming ritual with Vastu Shanti, Navagraha Havan and Ganesh Pujan.',
      duration: '3.5 - 4 hrs',
      price: 5100,
      rating: 4.95,
      reviewCount: 210,
      location: 'At Home',
      tag: 'Top Booked',
    },
    {
      id: 3,
      title: 'Maha Mrityunjaya Jaap',
      description: 'Sacred Vedic chanting ritual for health, longevity, protection and spiritual well-being.',
      duration: '2 hrs',
      price: 3500,
      rating: 4.88,
      reviewCount: 95,
      location: 'At Home / Temple',
      tag: 'Health',
    },
  ];

  const filtered = poojasList.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="saffron" size="sm">Pooja Marketplace</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
          Sacred Poojas & Rituals
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
          Browse authentic Vedic ceremonies performed at your home or holy temples by certified priests.
        </p>
      </div>

      <SearchBar
        placeholder="Search poojas by name (e.g., Satyanarayan, Griha Pravesh)..."
        value={search}
        onChange={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(pooja => (
          <PoojaCard
            key={pooja.id}
            {...pooja}
            onBookClick={() => addToast(`Booking initiated for ${pooja.title}`, 'success')}
          />
        ))}
      </div>
    </div>
  );
};

export default PoojasPage;
