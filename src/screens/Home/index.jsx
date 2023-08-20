import React, { useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'
import { globalStyle } from '../styles'
import colors from '../../utils/colors'
import { Icon } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ navigation, route }) {

  const navigate = navigation.navigate;

  useEffect(()=>{
    console.log(route.params)
  },[])

  async function logout() {
    await AsyncStorage.removeItem('@token');
    navigate('Login')
  }

  return (
    <View style={globalStyle.container}>
      <Icon
        name='power'
        type='ionicon'
        size={50}
        color={colors.red}
        containerStyle={globalStyle.back}
        onPress={logout}
      />
      <TouchableOpacity
        style={globalStyle.buttonMenu}
        onPress={() => navigate('Root', { screen: 'NewRevenue' })}
      >
        <Text style={[globalStyle.subTitle, globalStyle.white]}>Nova Receita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyle.buttonMenu}
        onPress={() => navigate('Root', { screen: 'Revenues', options: { usuario: usuario } })}
      >
        <Text style={[globalStyle.subTitle, globalStyle.white]}>Receitas</Text>
      </TouchableOpacity>
      {/* <Icon
        reverse
        name='add'
        size={25}
        color={colors.blue}
        containerStyle={globalStyle.anchorButton}
        onPress={()=>navigate('Root', {screen: 'NewRevenue'})}
      /> */}
    </View>
  )
}