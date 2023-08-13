import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyle } from '../../styles'
import api from '../../../services/api';

export default function Revenues({}) {
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
        setReceitas(res.data)
      }
    } catch (err) {
      console.error(err);
    }
  }

  function renderReceita(receita, id){
    return <View key={id} style={{ width: '100%', height: 50}}>
      <Text>{receita.nome}</Text>
    </View>
  }

  return (
    <View style={globalStyle.container}>
      {/* <Text>Revenues</Text> */}
      <View>
        {receitas && receitas.map((item, index) => renderReceita(item, index))}
      </View>
    </View>
  )
}