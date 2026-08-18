import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ShieldCheck, LogOut, Edit3, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/feedback/ToastContext.jsx';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      addToast('You have been logged out successfully', 'info');
      navigate('/', { replace: true });
    } catch {
      addToast('Logout failed. Please try again.', 'error');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateProfile({ name: name.trim(), phone: phone.trim() });
      if (res.success) {
        addToast('Profile updated successfully', 'success');
        setIsEditing(false);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <Badge variant="saffron" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Authenticated Session
          </Badge>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900 mt-2">
            My Account & Profile
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage your personal profile details and authenticated account settings.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          leftIcon={<LogOut className="w-4 h-4 text-stone-500" />}
        >
          Sign Out
        </Button>
      </div>

      {/* Account Profile Card */}
      <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-800 text-2xl font-bold font-serif shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-stone-900">{user?.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant={user?.role === 'ADMIN' ? 'saffron' : user?.role === 'PRIEST' ? 'recommended' : 'gray'} size="sm">
                Role: {user?.role}
              </Badge>
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Account
              </span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address (Immutable)"
              value={user?.email || ''}
              disabled
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="Email address changes require secondary verification in future releases."
            />

            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              placeholder="+91 98765 43210"
            />

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setName(user?.name || '');
                  setPhone(user?.phone || '');
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <span className="text-stone-400 font-medium block">Full Name</span>
                <span className="text-sm font-semibold text-stone-800 block">{user?.name}</span>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <span className="text-stone-400 font-medium block">Email Address</span>
                <span className="text-sm font-semibold text-stone-800 block">{user?.email}</span>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <span className="text-stone-400 font-medium block">Phone Number</span>
                <span className="text-sm font-semibold text-stone-800 block">{user?.phone || 'Not provided'}</span>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                <span className="text-stone-400 font-medium block">Member Since</span>
                <span className="text-sm font-semibold text-stone-800 block">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit3 className="w-4 h-4" />}
              >
                Edit Profile Information
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AccountPage;
