import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function TabIcon({ label, focused, badge }) {
  const { colors }=useTheme(); return <View style={{ minWidth:32,alignItems:'center' }}><Text style={{ fontSize:18,color:focused?colors.primary:colors.muted }}>{label}</Text>{badge>0?<View style={{ position:'absolute',top:-7,right:-12,minWidth:17,height:17,paddingHorizontal:3,borderRadius:9,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center' }}><Text style={{ color:'#fff',fontSize:9,fontWeight:'900' }}>{badge}</Text></View>:null}</View>;
}
