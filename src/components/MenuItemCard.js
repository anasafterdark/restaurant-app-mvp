import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui';
import { menuImages } from '../data/menuImages';
function MenuItemCard({ item, isFavourite, onAdd, onToggleFavourite }) {
  const { colors } = useTheme();
  // Console output helps compare card renders before and after React.memo/useCallback.
  console.log(`[MenuItemCard] rendered: ${item.name}`);
  return <View style={[styles.card,{ backgroundColor:colors.surface,borderColor:colors.border,opacity:item.isAvailable ? 1 : 0.54 }]}>
    <View style={styles.imageWrap}><Image source={menuImages[item.image] || { uri:item.image }} style={styles.image} /><Pressable onPress={() => onToggleFavourite(item.id)} style={styles.heart}><Text style={{ fontSize:20 }}>{isFavourite ? '♥' : '♡'}</Text></Pressable>{item.isSpecial ? <View style={[styles.special,{ backgroundColor:colors.primary }]}><Text style={styles.specialText}>DAILY SPECIAL</Text></View> : null}</View>
    <View style={{ padding:14,gap:5 }}><View style={{ flexDirection:'row',justifyContent:'space-between',gap:10 }}><Text style={{ color:colors.text,fontWeight:'800',fontSize:16,flex:1 }}>{item.name}</Text><Text style={{ color:colors.primary,fontWeight:'800' }}>Rs {item.price}</Text></View><Text numberOfLines={2} style={{ color:colors.muted,fontSize:13,lineHeight:19 }}>{item.description}</Text>
      <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:6 }}><Text style={{ color:item.isAvailable ? colors.success : colors.danger,fontSize:12,fontWeight:'700' }}>{item.isAvailable ? 'Available' : 'Sold out'}</Text><Button title={item.isAvailable ? 'Add to cart' : 'Unavailable'} disabled={!item.isAvailable} onPress={() => onAdd(item)} style={{ minHeight:38,borderRadius:12,paddingHorizontal:13 }} /></View>
    </View>
  </View>;
}
export default memo(MenuItemCard);
const styles = StyleSheet.create({ card:{ borderRadius:19,borderWidth:1,overflow:'hidden',marginBottom:13 },imageWrap:{ height:155,position:'relative',backgroundColor:'#e9e3d9' },image:{ width:'100%',height:'100%' },heart:{ position:'absolute',right:12,top:12,width:38,height:38,borderRadius:19,backgroundColor:'#ffffffdd',alignItems:'center',justifyContent:'center' },special:{ position:'absolute',left:12,bottom:12,paddingHorizontal:10,paddingVertical:6,borderRadius:12 },specialText:{ color:'#fff',fontSize:10,fontWeight:'900',letterSpacing:0.5 } });
