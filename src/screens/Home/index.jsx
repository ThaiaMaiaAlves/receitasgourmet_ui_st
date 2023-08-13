import { View, Text, TouchableOpacity } from 'react-native'

import React from 'react'
import { globalStyle } from '../styles'
import colors from '../../utils/colors'
import { Icon } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ navigation }) {

  async function logout(){
    await AsyncStorage.removeItem('@token');
    navigation.navigate('Login')
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
        onPress={()=>navigation.navigate('Root', {screen: 'NewRevenue'})}
      >
        <Text style={[globalStyle.subTitle, globalStyle.white]}>Nova Receita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyle.buttonMenu}
        onPress={()=>navigation.navigate('Root', {screen: 'Revenues'})}
      >
        <Text style={[globalStyle.subTitle, globalStyle.white]}>Receitas</Text>
      </TouchableOpacity>
      {/* <Icon
        reverse
        name='add'
        size={25}
        color={colors.blue}
        containerStyle={globalStyle.anchorButton}
        onPress={()=>navigation.navigate('Root', {screen: 'NewRevenue'})}
      /> */}
    </View>
  )
}