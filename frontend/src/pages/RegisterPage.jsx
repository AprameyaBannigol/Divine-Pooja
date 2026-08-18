import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password entry.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const res = await register(payload);
      if (res.success) {
        addToast(`Welcome to Divine Pooja Booking, ${res.data.name}!`, 'success');
        navigate('/account', { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please check your information and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="saffron" size="sm">Create Devotee Account</Badge>
        <h1 className="text-3xl font-extrabold font-serif text-stone-900">
          Join Divine Pooja Booking
        </h1>
        <p className="text-xs text-stone-600">
          Sign up to easily book verified pandits, view Panchang timings, and manage your spiritual rituals.
        </p>
      </div>

      <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Registration Error</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            leftIcon={<Phone className="w-4 h-4" />}
          />

          <div className="relative">
            <Input
              label="Password (min 8 characters)"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-stone-400 hover:text-stone-600 transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center mt-2"
            isLoading={isSubmitting}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amber-700 hover:text-amber-800 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
