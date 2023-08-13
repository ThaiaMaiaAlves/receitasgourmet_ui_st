import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Register from '../screens/Register';
import Root from './root';

const Stack = createNativeStackNavigator();

export default function Routes() {

  const auth = async () => {
    await AsyncStorage.getItem('@token')
  };

  function renderRoute() {
    if (auth)
      return
    return <>
    </>
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Group>
          <Stack.Screen name={'Root'} component={Root} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}