import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CustomersScreen from './src/screens/CustomersScreen';
import ToursScreen from './src/screens/ToursScreen';
import BookingsScreen from './src/screens/BookingsScreen';

// Configuración para que funcione en web y RN
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Login: '',
      Register: 'register',
      Home: 'home',
      Customers: 'customers',
      Tours: 'tours',
      Bookings: 'bookings',
    },
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Customers" component={CustomersScreen} />
        <Stack.Screen name="Tours" component={ToursScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
