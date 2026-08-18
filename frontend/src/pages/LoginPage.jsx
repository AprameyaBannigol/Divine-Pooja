import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  const from = location.state?.from?.pathname || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login({ email, password });
      if (res.success) {
        addToast(`Welcome back, ${res.data.name}!`, 'success');
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="saffron" size="sm">Devotee Portal</Badge>
        <h1 className="text-3xl font-extrabold font-serif text-stone-900">
          Sign In to Your Account
        </h1>
        <p className="text-xs text-stone-600">
          Enter your registered email and password to manage bookings and priest consultations.
        </p>
      </div>

      <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Authentication Failed</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center"
            isLoading={isSubmitting}
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-amber-700 hover:text-amber-800 hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
