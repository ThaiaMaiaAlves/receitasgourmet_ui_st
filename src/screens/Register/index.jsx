import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../styles'
import colors from '../../utils/colors'
import api from '../../services/api'
import { Icon } from '@rneui/themed'

export default function Register({ navigation }) {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [telefone, setTelefone] = useState()
  const [senha, setSenha] = useState()
  const [senha2, setSenha2] = useState()

  async function registrar() {
    try {
      if (senha === senha2) {
        const result =
          await api
            .post(
              '/usuarios',
              {
                nome, email, telefone, senha
              })
        if (result.status === 200) {
          Alert.alert(
            'Sucesso',
            'Usuário cadastrado com sucesso!',
            [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
          )
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={globalStyle.container}>
      <Icon        
        name='return-down-back-outline'
        type='ionicon'
        size={50}
        color={colors.red}
        containerStyle={globalStyle.back}
        onPress={()=>navigation.navigate('Login')}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.black }}>Cadastre-se</Text>
      <View style={{ width: '100%', padding: 40 }}>
        <TextInput
          style={[globalStyle.input, globalStyle.marginTop]}
          placeholder='Nome'
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[globalStyle.input, globalStyle.marginTop]}
          placeholder='Email'
          textContentType='emailAddress'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[globalStyle.input, globalStyle.marginTop]}
          placeholder='Telefone'
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={[globalStyle.input, globalStyle.marginTop]}
          placeholder='Senha'
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={[globalStyle.input, globalStyle.marginTop]}
          placeholder='Confirma senha'
          secureTextEntry
          value={senha2}
          onChangeText={setSenha2}
        />
        <TouchableOpacity
          style={globalStyle.button}
          onPress={registrar}
        >
          <Text style={{ color: colors.white }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}