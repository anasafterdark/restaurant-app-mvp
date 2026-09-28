import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockTables, mockReservations } from '../data/reservations';
import { useAuth } from '../context/AuthContext';
const ReservationContext = createContext(null);
const KEY = 'restaurant.reservations.v1';
const slots = Array.from({ length: 11 }, (_, i) => `${String(i + 12).padStart(2,'0')}:00`);
export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(mockReservations);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { let active = true; AsyncStorage.getItem(KEY).then((raw) => { if (active && raw) setReservations(JSON.parse(raw)); }).catch(() => {}).finally(() => { if (active) setHydrated(true); }); return () => { active = false; }; }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(KEY, JSON.stringify(reservations)).catch(() => {}); }, [reservations, hydrated]);
  const value = useMemo(() => ({ reservations, setReservations, hydrated }), [reservations, hydrated]);
  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}
export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation must be used inside ReservationProvider.');
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [time, setTime] = useState('19:00');
  const [partySize, setPartySize] = useState('2');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const availableTable = useCallback((slot, size, day = date) => mockTables.find((table) => table.seats >= Number(size) && !ctx.reservations.some((r) => r.date === day && r.time === slot && r.tableId === table.id && r.status !== 'cancelled')), [ctx.reservations, date]);
  const availableSlots = useMemo(() => slots.map((slot) => ({ slot, available: Boolean(availableTable(slot, partySize)) })), [availableTable, partySize]);
  const validate = useCallback(() => {
    if (!date || new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) return 'Choose today or a future date.';
    if (!Number.isInteger(Number(partySize)) || Number(partySize) < 1 || Number(partySize) > 12) return 'Party size must be between 1 and 12.';
    if (!/^03\d{2}-\d{7}$/.test(phone)) return 'Use Pakistani mobile format 03XX-XXXXXXX.';
    const when = new Date(`${date}T${time}:00`);
    if (when.getTime() < Date.now() + 3600000) return 'Bookings must be at least one hour ahead.';
    if (!availableTable(time, partySize)) return 'No table is available for that time and party size.';
    return '';
  }, [date, partySize, phone, time, availableTable]);
  const createReservation = useCallback(() => {
    const validation = validate(); setError(validation); if (validation) return null;
    const table = availableTable(time, partySize);
    const booking = { id:`r-${Date.now()}`, ownerId:user?.id, date, time, partySize:Number(partySize), contactName, phone, tableId:table.id, status:'pending' };
    ctx.setReservations((items) => [booking, ...items]); return booking;
  }, [validate, availableTable, time, partySize, date, contactName, phone, ctx, user?.id]);
  const cancelReservation = useCallback((id) => ctx.setReservations((items) => items.map((item) => item.id === id ? { ...item, status:'cancelled' } : item)), [ctx]);
  const updateReservationStatus = useCallback((id, status) => ctx.setReservations((items) => items.map((item) => item.id === id ? { ...item, status } : item)), [ctx]);
  const myReservations = useMemo(() => ctx.reservations.filter((item) => item.ownerId === user?.id), [ctx.reservations, user?.id]);
  return { date, setDate, time, setTime, partySize, setPartySize, contactName, setContactName, phone, setPhone, error, setError, reservations:ctx.reservations, myReservations, availableSlots, validate, createReservation, cancelReservation, updateReservationStatus, hydrated:ctx.hydrated };
}
export default useReservation;
