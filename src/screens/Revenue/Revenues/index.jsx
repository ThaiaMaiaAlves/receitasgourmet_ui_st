import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyle } from '../../styles'
import api from '../../../services/api';

export default function Revenues({navigation: {navigate, usuario}}) {
  const [receitas, setReceitas] = useState([])

  useEffect(()=>{
    loadReceitas()
  },[])

  async function loadReceitas(){
    try {
      const res = await api
      .get(
        '/receitas'
      )
      if(res.status == 200){
        console.log(res.data);
        setReceitas(res.data)
      }
    } catch (err) {
      console.error(err);
    }
  }

  function renderReceita(receita, id){
    return <View 
    key={id} 
    style={{ 
      width: '100%', 
      height: 50, 
      alignItems: 'flex-start',
      justifyContent: 'center'
      }}>
      <Text style={{fontSize: 20}}>{receita.nome_receita}</Text>
    </View>
  }

  return (
    <View style={globalStyle.container}>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {receitas && receitas.map((item, index) => renderReceita(item, index))}
      </View>
    </View>
  )
}