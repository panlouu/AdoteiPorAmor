import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import StackNavigator from './StackNavigator';
import RegistrationScreen from '../screens/RegistrationScreen';


const RootStack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={BottomTabNavigator} />

        <RootStack.Screen name="Lista" component={StackNavigator} />

        <RootStack.Screen
          name="Cadastro"
          component={RegistrationScreen}
          options={{ headerShown: true, title: 'Cadastrar Novo Pet 🐾' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
