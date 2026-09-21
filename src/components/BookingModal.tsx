import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { PARLOR_SERVICES, STYLISTS, ServiceItem, Stylist, AppointmentBooking } from '../types/parlor';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle, MapPin, Download, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  customPackageData?: {
    services: ServiceItem[];
    totalAmount: number;
  } | null;
}

export function BookingModal({
  isOpen,
  onClose,
  preSelectedServiceId,
  customPackageData,
}: BookingModalProps) {
  const { activeCombo } = useTheme();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedServiceId || PARLOR_SERVICES[0].id
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  if (!isOpen) return null;

  const currentService = PARLOR_SERVICES.find((s) => s.id === selectedServiceId) || PARLOR_SERVICES[0];
  const currentStylist = STYLISTS.find((s) => s.id === selectedStylistId);

  const finalServiceName = customPackageData
    ? `Custom VIP Package (${customPackageData.services.length} Rituals)`
    : currentService.name;

  const finalPrice = customPackageData ? customPackageData.totalAmount : currentService.price;

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const booking: AppointmentBooking = {
      id: `ELYS-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName,
      clientPhone,
      clientEmail,
      serviceId: selectedServiceId,
      serviceName: finalServiceName,
      stylistId: selectedStylistId,
      stylistName: currentStylist ? currentStylist.name : 'Master Lead Artist',
      date: bookingDate,
      timeSlot,
      notes: clientNotes,
      totalPrice: finalPrice,
      status: 'confirmed',
      bookingTime: new Date().toLocaleString(),
    };

    setConfirmedBooking(booking);
    setIsConfirmed(true);
  };

  const resetForm = () => {
    setIsConfirmed(false);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetForm}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl theme-transition z-10"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-main)',
        }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ backgroundColor: 'var(--surface-alt)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-luxury tracking-wide">
                {isConfirmed ? 'Appointment Confirmed' : 'Reserve Your Luxury Parlor Session'}
              </h3>
              <p className="text-xs opacity-70">
                {isConfirmed ? 'Digital VIP Access Pass Generated' : 'Priority Chair & Private Bridal Suite Booking'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetForm}
            aria-label="Close booking modal"
            className="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-black/5 theme-transition"
            style={{ borderColor: 'var(--border)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Service Preview */}
              <div
                className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                style={{ backgroundColor: 'var(--surface-alt)', borderColor: 'var(--border)' }}
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 block">
                    Selected Experience:
                  </span>
                  <h4 className="text-sm font-bold truncate">{finalServiceName}</h4>
                  <span className="text-xs opacity-75">
                    {customPackageData
                      ? `${customPackageData.services.length} treatments included`
                      : `${currentService.durationMinutes} mins · ${currentService.categoryLabel}`}
                  </span>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-bold font-serif-luxury block">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] opacity-60">Inclusive of Taxes</span>
                </div>
              </div>

              {/* If not custom package, allow changing service */}
              {!customPackageData && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Change Treatment:
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {PARLOR_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} (₹{srv.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Stylist Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                  Preferred Beauty Director / Stylist:
                </label>
                <select
                  value={selectedStylistId}
                  onChange={(e) => setSelectedStylistId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-main)',
                  }}
                >
                  <option value="any">First Available Master Artist (Fastest)</option>
                  {STYLISTS.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} — {st.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Date of Visit:
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Select Time Slot:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className="py-2 text-[11px] font-semibold rounded-lg border transition-all"
                        style={{
                          backgroundColor: timeSlot === slot ? 'var(--primary)' : 'var(--surface)',
                          borderColor: timeSlot === slot ? 'var(--primary)' : 'var(--border)',
                          color: timeSlot === slot ? 'var(--primary-text)' : 'var(--text-main)',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Your Full Name:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 opacity-40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanka Sen"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border-strong)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Phone / WhatsApp Number:
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 opacity-40" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border-strong)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider opacity-75">
                  Skin Allergies or Custom Preferences (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Sensitive skin, bridal dupatta draping instructions, organic tea preference..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none resize-none"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-main)',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-text)',
                }}
              >
                <Check className="w-4 h-4" />
                <span>Confirm Reservation (Pay at Parlor)</span>
              </button>
            </form>
          ) : (
            /* Confirmation Ticket Pass */
            <div className="space-y-6 text-center py-4">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg animate-bounce"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-text)' }}
              >
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-bold font-serif-luxury">
                  Reservation Confirmed!
                </h4>
                <p className="text-xs opacity-75">
                  We have held your priority chair and notified your beauty director.
                </p>
              </div>

              {/* Digital Pass Ticket */}
              {confirmedBooking && (
                <div
                  className="p-6 rounded-3xl border-2 border-dashed shadow-sm text-left space-y-4 relative"
                  style={{
                    backgroundColor: 'var(--surface-alt)',
                    borderColor: 'var(--primary)',
                  }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 block">
                        VIP Pass ID
                      </span>
                      <span className="text-sm font-bold font-mono" style={{ color: 'var(--primary-dark)' }}>
                        {confirmedBooking.id}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="opacity-60 block">Guest Name:</span>
                      <span className="font-bold">{confirmedBooking.clientName}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Contact Phone:</span>
                      <span className="font-bold">{confirmedBooking.clientPhone}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Treatment:</span>
                      <span className="font-bold">{confirmedBooking.serviceName}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Stylist / Artist:</span>
                      <span className="font-bold">{confirmedBooking.stylistName}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Date & Time:</span>
                      <span className="font-bold">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Amount Due:</span>
                      <span className="font-bold font-serif-luxury text-sm">
                        ₹{confirmedBooking.totalPrice.toLocaleString('en-IN')} (Pay at Parlor)
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-[11px] opacity-75">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>Elysian Luxury Suites: 42, Waterfield Road, Bandra West, Mumbai</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-text)',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
