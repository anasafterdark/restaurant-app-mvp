import React from 'react';
import { Switch, Text, View } from 'react-native';
import { Screen, Title, Body, Surface, Button, Divider } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
export default function ProfileScreen() {
 const {user,logout}=useAuth();const {isDark,toggleTheme,colors}=useTheme();
 return <Screen scroll><Title>Your profile</Title><Body style={{ marginTop:5 }}>Account details and appearance preferences.</Body><Surface style={{ marginTop:18 }}><Text style={{ color:colors.primary,fontSize:12,fontWeight:'900',letterSpacing:1 }}>SIGNED IN AS</Text><Title size={20} style={{ marginTop:9 }}>{user?.name||'Guest'}</Title><Body style={{ marginTop:4 }}>{user?.email}</Body><View style={{ marginTop:10,alignSelf:'flex-start',paddingHorizontal:11,paddingVertical:6,borderRadius:14,backgroundColor:colors.primarySoft }}><Text style={{ color:colors.primary,fontWeight:'800',textTransform:'capitalize' }}>{user?.role}</Text></View><Divider/><View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}><View><Text style={{ color:colors.text,fontWeight:'800' }}>Dark appearance</Text><Body>Applies across every screen</Body></View><Switch value={isDark} onValueChange={toggleTheme} trackColor={{ true:colors.primary }} /></View></Surface><Button title="Sign out" secondary onPress={logout} style={{ marginTop:16 }}/></Screen>;
}
