import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';



const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#FF6B6B',
          elevation: 0, 
          shadowOpacity: 0, 
        }, 
        headerTintColor: '#FFF', 
        headerTitleAlign: 'center', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="Lista" 
        component={ListScreen} 
        options={{ title: 'Pets para Adoção 🐾' }}
      />
      <Stack.Screen 
        name="Detalhes" 
        component={DetailScreen} 
        options={{ title: 'Conheça o Pet' }}
      />
    </Stack.Navigator>
  );
}
