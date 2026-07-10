// src/Components/admin/users/ShowUser.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarClock,
  BadgeCheck,
  BadgeAlert,
} from 'lucide-react';

import { findUserById } from '../../../app/services/slices/usersSlice';
import { showUser } from '../../../app/services/thunkFunctions/userThunk';

export default function ShowUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(true);
  const [alertError, setAlertError] = useState(null);

  useEffect(() => {
    const existsInList = users.some((u) => u.id == id);

    if (existsInList) {
      dispatch(findUserById(id));
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      setLoading(true);

      try {
        await dispatch(showUser(id)).unwrap();
      } catch (error) {
        console.error(error);
        setAlertError(
          error?.message || 'Failed to load user. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, users]);

  const initials = (name = '') =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
          Loading user...
        </div>
      </div>
    );
  }

  if (alertError) {
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-700 rounded-lg p-4">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="flex-1 text-sm">{alertError}</p>
        </div>

        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 mt-4 text-[#6750A4] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to users
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-[#cbc4d2] p-8 text-center text-[#494551]">
          User not found.
        </div>

        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 mt-4 text-[#6750A4] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to users
        </Link>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';
  const isVerified = !!user.email_verified_at;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-[#6750A4] hover:underline"
      >
        <ArrowLeft size={16} />
        Back to users
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#cbc4d2] p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-[#e9ddff] to-[#d8c7ff] flex items-center justify-center text-2xl font-bold text-[#4f378a]">
              {initials(user.name)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#1d1b20]">{user.name}</h1>

              <p className="text-sm text-[#6b7280] mt-0.5">
                USR-{String(user.id).padStart(3, '0')}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    isAdmin
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-[#e9ddff] text-[#4f378a]'
                  }`}
                >
                  <ShieldCheck size={13} />
                  {user.role}
                </span>

              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/admin/users/${user.id}/edit`)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#6750A4] text-white hover:bg-[#4f378a] transition shrink-0"
          >
            <Pencil size={18} />
            Edit User
          </button>
        </div>
      </div>

      {/* Contact info card */}
      <div className="bg-white rounded-2xl border border-[#cbc4d2] p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#494551] mb-5">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f3edf7] flex items-center justify-center">
              <Mail size={18} className="text-[#6750A4]" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-0.5">Email Address</p>
              <p className="text-sm font-medium text-[#1a1a1a]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f3edf7] flex items-center justify-center">
              <Phone size={18} className="text-[#6750A4]" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-0.5">Phone Number</p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {user.phone || (
                  <span className="italic text-[#9ca3af]">Not provided</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f3edf7] flex items-center justify-center">
              <MapPin size={18} className="text-[#6750A4]" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-0.5">Address</p>
              <p className="text-sm font-medium text-[#1a1a1a] whitespace-pre-wrap">
                {user.address || (
                  <span className="italic text-[#9ca3af]">Not provided</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account info card */}
      <div className="bg-white rounded-2xl border border-[#cbc4d2] p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#494551] mb-5">
          Account Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f3edf7] flex items-center justify-center">
              <CalendarClock size={18} className="text-[#6750A4]" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-0.5">Joined At</p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {user.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : '—'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f3edf7] flex items-center justify-center">
              <CalendarClock size={18} className="text-[#6750A4]" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280] mb-0.5">Last Updated</p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {user.updated_at
                  ? new Date(user.updated_at).toLocaleString()
                  : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
