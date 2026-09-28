import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockMenu } from '../data/menu';
const MenuContext = createContext(null);
const KEY = 'restaurant.menu.v1';
export function MenuProvider({ children }) {
  const [items, setItems] = useState(mockMenu);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { let active = true; AsyncStorage.getItem(KEY).then((raw) => { if (active && raw) setItems(JSON.parse(raw)); }).catch(() => {}).finally(() => { if (active) setHydrated(true); }); return () => { active = false; }; }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(KEY, JSON.stringify(items)).catch(() => {}); }, [items, hydrated]);
  const updateItem = (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const addItem = (entry) => setItems((current) => [{ ...entry, id: `m-${Date.now()}`, isSpecial: false, isAvailable: true, image: 'food-spread' }, ...current]);
  const value = useMemo(() => ({ items, updateItem, addItem, hydrated }), [items, hydrated]);
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
export function useMenu() { const value = useContext(MenuContext); if (!value) throw new Error('useMenu must be used inside MenuProvider.'); return value; }
