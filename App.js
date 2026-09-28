import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { MenuProvider } from './src/context/MenuContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { ReservationProvider } from './src/hooks/useReservation';
import AppNavigator from './src/navigation/AppNavigator';

function AppBody() {
  const { isDark } = useTheme();
  return <><StatusBar style={isDark ? 'light' : 'dark'} /><AppNavigator /></>;
}

export default function App() {
  return <SafeAreaProvider><ThemeProvider><AuthProvider><CartProvider><MenuProvider><OrdersProvider><ReservationProvider><AppBody /></ReservationProvider></OrdersProvider></MenuProvider></CartProvider></AuthProvider></ThemeProvider></SafeAreaProvider>;
}
