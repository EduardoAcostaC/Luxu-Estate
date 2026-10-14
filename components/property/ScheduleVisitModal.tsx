'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyLocation: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  propertyLocation,
}) => {
  const { t } = useTranslation();
  const [visitType, setVisitType] = useState<'in-person' | 'virtual'>('in-person');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tourTypeString =
    visitType === 'in-person'
      ? t('scheduleModal.inPersonTour')
      : t('scheduleModal.virtualTour');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-mosque/10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-nordic-dark/60 hover:text-nordic-dark hover:bg-black/5 transition-colors"
          aria-label={t('filtersModal.close')}
        >
          <span className="material-icons text-xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-mosque/10 text-mosque rounded-full flex items-center justify-center mx-auto">
              <span className="material-icons text-3xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-nordic-dark">{t('scheduleModal.successTitle')}</h3>
            <p className="text-sm text-nordic-dark/70 max-w-sm mx-auto">
              {t('scheduleModal.successMessage', {
                name: name || 'valued client',
                tourType: tourTypeString,
                property: propertyTitle,
              })}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-mosque text-white font-medium rounded-lg hover:bg-[#005544] transition-colors shadow-md"
            >
              {t('scheduleModal.closeButton')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-mosque">
                {t('scheduleModal.title')}
              </span>
              <h3 className="text-2xl font-bold text-nordic-dark mt-1">
                {propertyTitle}
              </h3>
              <p className="text-xs text-nordic-muted flex items-center gap-1 mt-1">
                <span className="material-icons text-xs text-mosque">place</span> {propertyLocation}
              </p>
            </div>

            {/* Tour Type */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVisitType('in-person')}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  visitType === 'in-person'
                    ? 'bg-mosque text-white border-mosque shadow-sm'
                    : 'bg-white text-nordic-dark border-slate-200 hover:border-mosque'
                }`}
              >
                <span className="material-icons text-lg">person_pin_circle</span>
                {t('scheduleModal.inPerson')}
              </button>
              <button
                type="button"
                onClick={() => setVisitType('virtual')}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  visitType === 'virtual'
                    ? 'bg-mosque text-white border-mosque shadow-sm'
                    : 'bg-white text-nordic-dark border-slate-200 hover:border-mosque'
                }`}
              >
                <span className="material-icons text-lg">videocam</span>
                {t('scheduleModal.virtual')}
              </button>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-nordic-dark mb-1">
                  {t('scheduleModal.dateLabel')}
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/20 focus:border-mosque bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-nordic-dark mb-1">
                  {t('scheduleModal.timeLabel')}
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/20 focus:border-mosque bg-white"
                >
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>03:30 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-nordic-dark mb-1">
                  {t('scheduleModal.nameLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('scheduleModal.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/20 focus:border-mosque"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-nordic-dark mb-1">
                    {t('scheduleModal.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t('scheduleModal.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/20 focus:border-mosque"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-nordic-dark mb-1">
                    {t('scheduleModal.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t('scheduleModal.phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/20 focus:border-mosque"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-mosque hover:bg-[#005544] text-white font-medium rounded-xl shadow-lg shadow-mosque/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span className="material-icons text-lg">calendar_month</span>
              {t('scheduleModal.submitButton')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
