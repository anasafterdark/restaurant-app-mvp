import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { categories } from '../data/menu';
import { Screen, Title, Body, Chip, Surface, Button } from '../components/ui';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { useTheme } from '../context/ThemeContext';
import useDebounce from '../hooks/useDebounce';
export default function MenuScreen({ navigation }) {
  const { colors } = useTheme(); const { items:sourceItems } = useMenu(); const { dispatch } = useCart();
  const [menuItems,setMenuItems] = useState([]), [isLoading,setIsLoading] = useState(true), [error,setError] = useState('');
  const [category,setCategory] = useState('All'), [text,setText] = useState(''), [sort,setSort] = useState('featured');
  const [history,setHistory] = useState([]), [focused,setFocused] = useState(false), [scrollY,setScrollY] = useState(0), [favourites,setFavourites] = useState([]);
  const inputRef = useRef(null), listRef = useRef(null), timerRef = useRef(null), previousQueryRef = useRef(''), renderCount = useRef(0);
  renderCount.current += 1; // Updating a ref preserves a value without asking React to render; state updates schedule a render.
  const query = useDebounce(text,400);
  const loadMenu = useCallback(() => { setIsLoading(true); setError(''); let active=true; const timer=setTimeout(() => { if (active) { setMenuItems(sourceItems); setIsLoading(false); } },1500); timerRef.current=timer; return () => { active=false; clearTimeout(timer); }; },[sourceItems]);
  useEffect(() => { const cleanup=loadMenu(); return cleanup; },[loadMenu]);
  const refresh = useCallback(() => { setIsLoading(true); setTimeout(() => { setMenuItems(sourceItems); setIsLoading(false); },650); },[sourceItems]);
  useEffect(() => { navigation.setOptions?.({ title:`Menu · ${menuItems.length}` }); },[navigation,menuItems.length]);
  useEffect(() => { const value=query.trim(); if (!value || value.toLowerCase()===previousQueryRef.current.toLowerCase()) return; previousQueryRef.current=value; setHistory((prev)=>[value,...prev.filter((x)=>x.toLowerCase()!==value.toLowerCase())].slice(0,5)); },[query]);
  const visibleItems = useMemo(() => {
    let next=menuItems.filter((item)=>(category==='All'||item.category===category)&&(!query.trim()||`${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())));
    if(sort==='low') next=[...next].sort((a,b)=>a.price-b.price); if(sort==='high') next=[...next].sort((a,b)=>b.price-a.price); if(sort==='name') next=[...next].sort((a,b)=>a.name.localeCompare(b.name));
    // Filtered/sorted rows are derived from source state; keeping a duplicate state copy risks stale results.
    return next;
  },[menuItems,category,query,sort]);
  const onAdd=useCallback((item)=>dispatch({type:'ADD_ITEM',item}),[dispatch]);
  const onToggleFavourite=useCallback((id)=>setFavourites((prev)=>prev.includes(id)?prev.filter((x)=>x!==id):[...prev,id]),[]);
  const pickHistory=useCallback((term)=>{setText(term);setFocused(false);inputRef.current?.blur();},[]);
  const renderItem=useCallback(({item})=><MenuItemCard item={item} isFavourite={favourites.includes(item.id)} onAdd={onAdd} onToggleFavourite={onToggleFavourite}/>,[favourites,onAdd,onToggleFavourite]);
  const listHeader=<View style={{ padding:18,paddingBottom:8 }}><View style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginBottom:15 }}><View><Text style={{ color:colors.primary,fontSize:11,fontWeight:'900',letterSpacing:1.2 }}>GOOD FOOD, GOOD MOOD</Text><Title style={{ marginTop:4 }}>Today’s menu</Title></View><Text style={{ color:colors.muted,fontSize:11 }}>renders: {renderCount.current}</Text></View>
    <View style={{ flexDirection:'row',alignItems:'center',gap:8,backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:14,paddingHorizontal:12,marginBottom:13 }}><Pressable onPress={()=>inputRef.current?.focus()}><Text style={{fontSize:18}}>⌕</Text></Pressable><TextInput ref={inputRef} placeholder="Search dishes or categories" placeholderTextColor={colors.muted} value={text} onChangeText={setText} onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),120)} style={{ flex:1,color:colors.text,paddingVertical:12 }} /><Pressable onPress={()=>{setText('');inputRef.current?.focus();}}><Text style={{ color:colors.primary,fontWeight:'800' }}>Clear</Text></Pressable></View>
    {focused&&!text&&history.length>0?<View style={{ flexDirection:'row',flexWrap:'wrap',gap:7,marginBottom:11 }}>{history.map((term)=><Chip key={term} label={`↺ ${term}`} onPress={()=>pickHistory(term)}/>)}</View>:null}
    <FlatList horizontal showsHorizontalScrollIndicator={false} data={categories} keyExtractor={(x)=>x} contentContainerStyle={{ gap:7,paddingBottom:13 }} renderItem={({item})=><Chip label={item} selected={category===item} onPress={()=>setCategory(item)}/>} />
    <View style={{ flexDirection:'row',alignItems:'center',gap:8,marginBottom:8 }}><Body>Sort:</Body>{[['featured','Featured'],['low','Price ↑'],['high','Price ↓'],['name','A–Z']].map(([id,label])=><Chip key={id} label={label} selected={sort===id} onPress={()=>setSort(id)}/>)}</View>
    <Body style={{ marginBottom:8 }}>{visibleItems.length} dishes · search waits 400 ms to reduce unnecessary filtering</Body></View>;
  if(isLoading) return <Screen style={{ alignItems:'center',justifyContent:'center',gap:12 }}><ActivityIndicator size="large" color={colors.primary}/><Body>Preparing the menu…</Body></Screen>;
  if(error) return <Screen scroll><Title>Menu unavailable</Title><Body>{error}</Body><Button title="Try again" onPress={refresh}/></Screen>;
  return <Screen style={{ flex:1 }}><FlatList ref={listRef} data={visibleItems} keyExtractor={(item)=>item.id} renderItem={renderItem} ListHeaderComponent={listHeader} contentContainerStyle={{ paddingBottom:28 }} refreshing={isLoading} onRefresh={refresh} onScroll={(e)=>setScrollY(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16} ListEmptyComponent={<View style={{ padding:24,alignItems:'center' }}><Title size={18}>No dishes found</Title><Body>Try another search or category.</Body></View>} /><Text style={{ position:'absolute',bottom:6,right:14,fontSize:10,color:colors.muted,backgroundColor:colors.surface }}>render #{renderCount.current}</Text>{scrollY>300?<Pressable onPress={()=>listRef.current?.scrollToOffset({offset:0,animated:true})} style={{ position:'absolute',right:18,bottom:28,paddingHorizontal:15,paddingVertical:12,borderRadius:22,backgroundColor:colors.primary }}><Text style={{ color:'#fff',fontWeight:'800' }}>↑ Back to top</Text></Pressable>:null}</Screen>;
}
