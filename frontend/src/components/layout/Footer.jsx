import React from 'react';
import { Flame, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-amber-200" />
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                Divine Pooja
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Connecting devotees with verified Vedic priests for sacred poojas, havans, and religious rituals across India.
            </p>
            <div className="flex items-center space-x-3 text-stone-400">
              <span className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-xs font-bold">
                fb
              </span>
              <span className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-xs font-bold">
                ig
              </span>
              <span className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-xs font-bold">
                yt
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/poojas" className="hover:text-amber-400 transition-colors">Browse Poojas</Link>
              </li>
              <li>
                <Link to="/priests" className="hover:text-amber-400 transition-colors">Verified Priests</Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">Panchang & Muhurta</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Griha Pravesh Pooja</li>
              <li>Satyanarayan Katha</li>
              <li>Vastu Shanti Pooja</li>
              <li>Maha Mrityunjaya Jaap</li>
              <li>Marriage & Engagement</li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-amber-500 tracking-wider">
              Contact & Support
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@divinepooja.example</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 1800-123-POOJA</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Divine Pooja Booking. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Crafted with reverence &</span>
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
