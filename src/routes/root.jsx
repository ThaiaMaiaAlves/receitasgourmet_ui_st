
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Revenue from '../screens/Revenue';
import NewRevenue from '../screens/Revenue/NewRevenue';
import Revenues from '../screens/Revenue/Revenues';
import colors from '../utils/colors';

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      title: 'Receitas Gourmet',
      statusBarColor: colors.blue,
      headerStyle:{backgroundColor: colors.blue},
      headerTintColor: colors.white
    }}>
      <Stack.Screen name='Home' component={Home}  />
      <Stack.Screen name='Revenue' component={Revenue} />
      <Stack.Screen name='Revenues' component={Revenues} />
      <Stack.Screen name='NewRevenue' component={NewRevenue} />
    </Stack.Navigator>
  )
}