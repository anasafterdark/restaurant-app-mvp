import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
export function Screen({ children, scroll = false, style, contentStyle }) {
  const { colors } = useTheme();
  const content = scroll ? <ScrollView contentContainerStyle={[styles.content, contentStyle]} keyboardShouldPersistTaps="handled">{children}</ScrollView> : children;
  return <SafeAreaView edges={['top','left','right']} style={[styles.safe, { backgroundColor:colors.background }, style]}><View style={styles.centered}>{content}</View></SafeAreaView>;
}
export function Title({ children, size = 24, style }) { const { colors } = useTheme(); return <Text style={[{ color:colors.text, fontSize:size, fontWeight:'800', letterSpacing:-0.5 }, style]}>{children}</Text>; }
export function Body({ children, style }) { const { colors } = useTheme(); return <Text style={[{ color:colors.muted, fontSize:14, lineHeight:21 }, style]}>{children}</Text>; }
export function Button({ title, onPress, secondary = false, disabled = false, loading = false, style }) {
  const { colors } = useTheme();
  return <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.button, { backgroundColor:secondary ? colors.primarySoft : colors.primary, opacity:disabled ? 0.48 : pressed ? 0.82 : 1 }, style]}>
    {loading ? <ActivityIndicator color={secondary ? colors.primary : '#fff'} /> : <Text style={{ color:secondary ? colors.primary : '#fff', fontWeight:'800', fontSize:14 }}>{title}</Text>}
  </Pressable>;
}
export function Field({ label, value, onChangeText, placeholder, error, secureTextEntry = false, keyboardType, right, multiline = false, style }) {
  const { colors } = useTheme();
  return <View style={{ gap:6, marginBottom:12 }}><Text style={{ color:colors.text, fontWeight:'700', fontSize:13 }}>{label}</Text>
    <View style={[styles.fieldWrap,{ borderColor:error ? colors.danger : colors.border, backgroundColor:colors.surface }, multiline && { minHeight:88, alignItems:'flex-start' }]}>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder || label} placeholderTextColor={colors.muted} secureTextEntry={secureTextEntry} keyboardType={keyboardType} multiline={multiline} style={[styles.input,{ color:colors.text }, multiline && { minHeight:76, textAlignVertical:'top' }, style]} />{right}
    </View>{error ? <Text style={{ color:colors.danger, fontSize:12 }}>{error}</Text> : null}</View>;
}
export function Surface({ children, style }) { const { colors } = useTheme(); return <View style={[styles.surface,{ backgroundColor:colors.surface, borderColor:colors.border },style]}>{children}</View>; }
export function Chip({ label, selected, onPress, disabled = false }) { const { colors } = useTheme(); return <Pressable onPress={onPress} disabled={disabled} style={{ paddingHorizontal:14,paddingVertical:9,borderRadius:20,backgroundColor:selected ? colors.primary : colors.chip,borderWidth:1,borderColor:selected ? colors.primary : colors.border,opacity:disabled ? 0.4 : 1 }}><Text style={{ color:selected ? '#fff' : colors.text,fontWeight:'700',fontSize:12 }}>{label}</Text></Pressable>; }
export function Divider() { const { colors } = useTheme(); return <View style={{ height:1,backgroundColor:colors.border,marginVertical:14 }} />; }
export const spacing = { page:18, gap:12 };
const styles = StyleSheet.create({ safe:{ flex:1 }, centered:{ flex:1,width:'100%',maxWidth:680,alignSelf:'center' }, content:{ width:'100%',padding:18,paddingBottom:36 }, button:{ minHeight:48,borderRadius:15,alignItems:'center',justifyContent:'center',paddingHorizontal:16 },fieldWrap:{ minHeight:48,borderWidth:1,borderRadius:13,paddingHorizontal:13,flexDirection:'row',alignItems:'center' },input:{ flex:1,fontSize:15,paddingVertical:11 },surface:{ borderWidth:1,borderRadius:18,padding:15 }, });
