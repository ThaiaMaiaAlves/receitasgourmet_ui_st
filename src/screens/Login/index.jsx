import React, { useState } from 'react'
import api from '../../services/api'
import colors from '../../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from 'react-native'
import { globalStyle } from '../styles'

export default function Login({ navigation }) {
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  async function login() {
    await api
      .post(
        '/login',
        {
          email, senha
        }
      )
      .then(function (res) {
        console.log(res);
        if (res.status == '401') {
          Alert.alert('Login', res.message)
        }
        if (res.status == '200') {
          AsyncStorage.setItem('@token', res.data.data.token)
          navigation.navigate('Root', { screen: 'Home' })
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Login', err.message)
      });

  }

  return (
    // <KeyboardAvoidingView behavior="position" enabled>
      <View style={globalStyle.container}>
        <Text style={globalStyle.title}>Login</Text>
        <View style={{ width: 300, height: 300 }}>
          <TextInput
            style={globalStyle.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[globalStyle.input, {marginTop: 10}]}
            placeholder='Senha'
            value={senha}
            secureTextEntry
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={globalStyle.button}
            onPress={login}
          >
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>Entrar</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignSelf: 'center' }}>
            <Text>Não é cadastrado?</Text>
            <Text style={{ color: '#4b92d8' }} onPress={() => navigation.navigate('Register')}> Cadastre-se.</Text>
          </View>
        </View>
      </View>
    // </KeyboardAvoidingView>
  )
}