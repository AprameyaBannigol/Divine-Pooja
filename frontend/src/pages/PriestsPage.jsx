import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar.jsx';
import PriestCard from '../components/priest/PriestCard.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';

const PriestsPage = () => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const priestsList = [
    {
      id: 1,
      name: 'Pt. Ramesh Sharma',
      isVerified: true,
      experience: '15+ yrs exp',
      languages: ['Sanskrit', 'Hindi', 'Kannada'],
      specialization: 'Griha Pravesh & Mahamrityunjay',
      location: 'Bengaluru, KA',
      rating: 4.95,
      reviewCount: 98,
      isAvailable: true,
      startingPrice: 2100,
    },
    {
      id: 2,
      name: 'Pt. Ananthakrishna Shastri',
      isVerified: true,
      experience: '18+ yrs exp',
      languages: ['Sanskrit', 'Kannada', 'English'],
      specialization: 'Navagraha Havan & Vastu Shanti',
      location: 'Indiranagar, Bengaluru',
      rating: 4.98,
      reviewCount: 184,
      isAvailable: true,
      startingPrice: 3100,
    },
  ];

  const filtered = priestsList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="verified" size="sm">Priest Marketplace</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
          Verified Vedic Priests
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
          Connect with experienced, background-verified pandits and acharyas for your religious ceremonies.
        </p>
      </div>

      <SearchBar
        placeholder="Search priests by name or specialization..."
        value={search}
        onChange={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(priest => (
          <PriestCard
            key={priest.id}
            {...priest}
            onViewProfile={() => addToast(`Viewing profile of ${priest.name}`, 'info')}
            onBookNow={() => addToast(`Booking pandit ${priest.name}`, 'success')}
          />
        ))}
      </div>
    </div>
  );
};

export default PriestsPage;
