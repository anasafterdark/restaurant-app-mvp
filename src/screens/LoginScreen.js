import React, { useCallback, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Screen, Title, Body, Field, Button, Chip, Surface } from '../components/ui';
import useForm from '../hooks/useForm';
import { mockUsers } from '../data/users';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
const INITIAL={name:'',email:'',password:'',confirmPassword:'',role:'customer'};
export default function LoginScreen() {
 const [mode,setMode]=useState('login'),[showPassword,setShowPassword]=useState(false),[isSubmitting,setIsSubmitting]=useState(false);
 const {login}=useAuth(); const {colors}=useTheme();
 const validate=useCallback((values)=>{const e={};if(mode==='signup'&&!values.name.trim())e.name='Enter your full name.';if(!/^\S+@\S+\.\S+$/.test(values.email))e.email='Enter a valid email address.';if(values.password.length<8||!/[0-9]/.test(values.password))e.password='Use at least 8 characters and one digit.';if(mode==='signup'&&values.password!==values.confirmPassword)e.confirmPassword='Passwords do not match.';return e;},[mode]);
 const form=useForm(INITIAL,validate);
 const submit=form.handleSubmit(async(values)=>{setIsSubmitting(true);await new Promise((resolve)=>setTimeout(resolve,1000));let user;
   if(mode==='signup'){user={id:`u-${Date.now()}`,name:values.name.trim(),email:values.email.trim().toLowerCase(),role:values.role};}
   else user=mockUsers.find((entry)=>entry.email.toLowerCase()===values.email.trim().toLowerCase()&&entry.password===values.password);
   setIsSubmitting(false);if(!user){Alert.alert('Could not sign in','Email or password did not match the demo accounts.');return;}const {password,...safeUser}=user;login(safeUser);
 });
 return <Screen scroll contentStyle={{ flexGrow:1,justifyContent:'center',paddingTop:26 }}><Text style={{ color:colors.primary,fontWeight:'900',letterSpacing:1.7,fontSize:12 }}>TABLE & THYME</Text><Title size={31} style={{ marginTop:8 }}>{mode==='login'?'A table for you.':'Join us at the table.'}</Title><Body style={{ marginTop:6,marginBottom:22 }}>{mode==='login'?'Sign in to browse today’s menu and make it yours.':'Create an account to order and reserve with ease.'}</Body>
 <Surface style={{ padding:18 }}><View style={{ flexDirection:'row',gap:8,marginBottom:16 }}><Chip label="Login" selected={mode==='login'} onPress={()=>setMode('login')}/><Chip label="Sign up" selected={mode==='signup'} onPress={()=>setMode('signup')}/></View>
 {mode==='signup'?<><Field label="Full name" value={form.values.name} onChangeText={(v)=>form.handleChange('name',v)} error={form.errors.name}/><Text style={{ color:colors.muted,fontSize:11,marginTop:-7,marginBottom:7 }}>Use the name you want shown on your orders.</Text></>:null}
 <Field label="Email" value={form.values.email} onChangeText={(v)=>form.handleChange('email',v)} keyboardType="email-address" error={form.errors.email}/><Field label="Password" value={form.values.password} onChangeText={(v)=>form.handleChange('password',v)} secureTextEntry={!showPassword} error={form.errors.password} right={<Pressable onPress={()=>setShowPassword(!showPassword)}><Text style={{ color:colors.primary,fontWeight:'700' }}>{showPassword?'Hide':'Show'}</Text></Pressable>}/>
 {mode==='signup'?<><Field label="Confirm password" value={form.values.confirmPassword} onChangeText={(v)=>form.handleChange('confirmPassword',v)} secureTextEntry={!showPassword} error={form.errors.confirmPassword}/><Text style={{ color:colors.text,fontWeight:'700',fontSize:13,marginBottom:8 }}>Choose a role</Text><View style={{ flexDirection:'row',gap:8,marginBottom:14 }}><Chip label="Customer" selected={form.values.role==='customer'} onPress={()=>form.handleChange('role','customer')}/><Chip label="Manager" selected={form.values.role==='manager'} onPress={()=>form.handleChange('role','manager')}/></View></>:null}
 <Button title={mode==='login'?'Sign in':'Create account'} onPress={submit} loading={isSubmitting} style={{ marginTop:4 }}/><Text style={{ color:colors.muted,fontSize:11,lineHeight:17,marginTop:13 }}>Demo customer: customer@demo.com / food1234{ '\n' }Demo manager: manager@demo.com / manage123</Text></Surface>
 <View style={{ flexDirection:'row',justifyContent:'center',marginTop:16 }}><Text style={{ color:colors.muted }}>{mode==='login'?"New here? ":'Already have an account? '}</Text><Pressable onPress={()=>setMode(mode==='login'?'signup':'login')}><Text style={{ color:colors.primary,fontWeight:'800' }}>{mode==='login'?'Create an account':'Sign in'}</Text></Pressable></View>
 </Screen>;
}
