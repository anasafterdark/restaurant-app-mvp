import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import ReservationScreen from '../screens/ReservationScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ManagerDashboardScreen from '../screens/ManagerDashboardScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import TabIcon from '../components/TabIcon';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { useOrders } from '../context/OrdersContext';
import { useReservation } from '../hooks/useReservation';
const Stack=createNativeStackNavigator();const Tabs=createBottomTabNavigator();
function MainTabs(){const {user}=useAuth();const {colors}=useTheme();const {count}=useCart();return <Tabs.Navigator screenOptions={({route})=>({headerTitleStyle:{fontWeight:'800'},headerStyle:{backgroundColor:colors.surface},headerTintColor:colors.text,tabBarStyle:{backgroundColor:colors.surface,borderTopColor:colors.border,height:62,paddingBottom:8,paddingTop:5},tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.muted,tabBarLabelStyle:{fontSize:10,fontWeight:'700'},tabBarIcon:({focused})=><TabIcon label={({Menu:'⌂',Cart:'＋',Book:'▦',Orders:'◷',Profile:'○',Manager:'▤'})[route.name]} focused={focused} badge={route.name==='Cart'?count:0}/>})}>
 <Tabs.Screen name="Menu" component={MenuScreen} options={{title:'Menu'}}/><Tabs.Screen name="Cart" component={CartScreen} options={{title:'Cart'}}/><Tabs.Screen name="Book" component={ReservationScreen} options={{title:'Reserve'}}/><Tabs.Screen name="Orders" component={OrdersScreen} options={{title:'Orders'}}/><Tabs.Screen name="Profile" component={ProfileScreen} options={{title:'Profile'}}/>{user?.role==='manager'?<Tabs.Screen name="Manager" component={ManagerDashboardScreen} options={{title:'Manage'}}/>:null}
 </Tabs.Navigator>}
function Bootstrap(){const {user}=useAuth();const {colors,isDark}=useTheme();const menu=useMenu();const orders=useOrders();const reservation=useReservation();const {count}=useCart();
 if(!menu.hydrated||!orders.hydrated||!reservation.hydrated)return <View style={{flex:1,backgroundColor:colors.background,alignItems:'center',justifyContent:'center'}}><ActivityIndicator size="large" color={colors.primary}/></View>;
 const navTheme={...(isDark?DarkTheme:DefaultTheme),colors:{...(isDark?DarkTheme.colors:DefaultTheme.colors),background:colors.background,card:colors.surface,text:colors.text,border:colors.border,primary:colors.primary}};
 return <NavigationContainer theme={navTheme}><Stack.Navigator screenOptions={{headerStyle:{backgroundColor:colors.surface},headerTintColor:colors.text,headerTitleStyle:{fontWeight:'800'},contentStyle:{backgroundColor:colors.background}}}>{user?<><Stack.Screen name="Tabs" component={MainTabs} options={{headerShown:false}}/><Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{title:'Order summary'}}/><Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{title:'Track order'}}/></>:<Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>}</Stack.Navigator></NavigationContainer>;
}
export default function AppNavigator(){return <Bootstrap/>;}
