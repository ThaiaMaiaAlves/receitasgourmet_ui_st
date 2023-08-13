import React, { useState, useEffect, useRef } from 'react'
import { View, Image, TextInput, Text, Button, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { globalStyle } from '../../styles'
import colors from '../../../utils/colors'
import api from '../../../services/api'
import { Icon } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function NewRevenue({ navigation, route }) {
  const [nome, setNome] = useState()
  const [preparo, setPreparo] = useState()
  const [tempo, setTempo] = useState()
  const [imagem, setImagem] = useState()
  const [listaIngred, setListaIngred] = useState()
  const [listaUnMedida, setListaUnMedida] = useState()
  const [listaCateg, setListaCateg] = useState()
  const [ingredientes, setIngredientes] = useState([])
  const [categoria, setCategoria] = useState()
  const [unMedida, setUnMedida] = useState()
  const [ingrediente, setIngrediente] = useState()
  const [quantidade, setQuantidade] = useState()
  const pickerRef = useRef();
  const pickerRef2 = useRef();
  const pickerRef3 = useRef();


  useEffect(() => {
    getListaCateg()
    getListaIngred()
    getListaUnMedida()
  }, [])

  useEffect(() => {
    console.log(ingredientes);
  }, [ingredientes])

  async function getListaCateg() {
    await api.get('/categorias')
      .then(function (res) {
        let array = res.data.sort(compare)
        setListaCateg(array)
      })
  }

  async function getListaIngred() {
    await api.get('/ingredientes')
      .then(function (res) {
        let array = res.data.sort(compare)
        setListaIngred(array)
      })
  }

  async function getListaUnMedida() {
    await api.get('/un_medida')
      .then(function (res) {
        let array = res.data.sort(compare)
        setListaUnMedida(array)
      })
  }

  function compare(a, b) {
    return a.nome.localeCompare(b.nome)
  }

  async function salvar() {
    try {
      const resReceita = await api
        .post(
          '/receitas',
          {
            nome_receita: nome,
            cod_categoria: categoria,
            foto: imagem,
            cod_usuario: 3,
            tempo_preparo: tempo,
            modo_preparo: preparo,
            status_receita: 'Em análise'
          }
        );

      console.log(ingredientes);

      if (resReceita.status == 200) {
        const resIngred = await api
          .post(
            '/ingred_receitas',
            {
              cod_receita: resReceita.data[0],
              ingredientes: ingredientes
            }
          )

        if (resIngred.status == 200) {
          Alert.alert('Sucesso!', 'Nova receita salva com sucesso!')
          navigation.navigate('Root', { screen: 'Home' })
        }
      }


    } catch (err) {
      console.error(err);
      console.log('Erro ao tentar salvar nova Receita!');
    }
  }

  async function apagar() {
    try {
      const resReceita = await api
        .delete(`/receitas/${cod_receita}`);

      console.log(ingredientes);

      if (resReceita.status == 200) {
        Alert.alert('Sucesso', 'Receita excluída com sucesso!')
        navigation.navigate('Root', { screen: 'Home' })
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function insertIngredient() {
    await setIngredientes(oldArray => [
      ...oldArray, {}])
  }

  function updateIngredient(value, name, id) {
    let objs = ingredientes.filter((item, index) => index === id)
    if (objs)
      objs[0][name] = value
    setIngredientes(oldArray =>
      oldArray?.map((item, index) => {
        if (id === index) {
          return objs[0]
        }
        return item
      })
    )
  }

  function removeIngredient(indexIngr) {
    console.log(indexIngr);
    setIngredientes(oldArray => oldArray.splice(indexIngr, 1))
  }

  function renderIngredient(itemIngr, indexIngr) {
    return (
      <View
        key={indexIngr}
        style={globalStyle.cardIngredient}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}
        >
          <TextInput
            style={[globalStyle.input, { width: 60 }]}
            placeholder='Qtde'
            inputMode='numeric'
            value={itemIngr?.quantidade?.toString() || ''}
            onChangeText={(value) => updateIngredient(value, 'quantidade', indexIngr)}
          />
          <View
            style={{ flex: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 5, marginLeft: 10 }}
          >
            <Picker
              ref={pickerRef2}
              placeholder='Un. medida'
              selectedValue={itemIngr?.cod_un_medida}
              onValueChange={(value) =>
                updateIngredient(value, 'cod_un_medida', indexIngr)
              }>
              {listaUnMedida && listaUnMedida.map((item, index) => <Picker.Item key={index} label={item.nome} value={item.cod_un_medida} />)}
            </Picker>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}
        >
          <Icon
            name='remove'
            size={50}
            color={colors.background}
            containerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              marginHorizontal: 5,

            }}
            onPress={() => removeIngredient(indexIngr)}
          />
          <View
            style={{ flex: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 5, marginLeft: 10 }}
          >
            <Picker
              ref={pickerRef3}
              placeholder='Ingrediente'
              selectedValue={itemIngr?.cod_ingrediente}
              onValueChange={(value) =>
                updateIngredient(value, 'cod_ingrediente', indexIngr)
              }>
              {listaIngred && listaIngred.map((item, index) => <Picker.Item key={index} label={item.nome} value={item.cod_ingrediente} />)}
            </Picker>
          </View>
        </View>
      </View>
    )
  }

  async function selectImage() {
    await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    }, function (response) {
      if (!response.didCancel) {
        setImagem(response.assets[0].uri)
      }
    })
  }

  return (
    // <KeyboardAvoidingView behavior="position" enabled>
    <ScrollView>
      <View style={globalStyle.container}>
        <Text style={globalStyle.title}>Cadastro de receitas</Text>
        <View style={{ width: '100%', maxHeight: 180, alignItems: 'center', marginBottom: 10 }}>
          <Image
            source={require('../../../assets/new-image-default.png')}
            style={{ maxHeight: 180, resizeMode: 'contain' }}
          />
          <Icon
            reverse
            name='add'
            size={25}
            color={colors.blue}
            containerStyle={globalStyle.imageAddButton}
            onPress={selectImage}
          />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 20, }}>
          <TextInput
            style={globalStyle.input}
            placeholder='Nome da receita'
            value={nome}
            onChangeText={setNome}
          />
          <View style={{ backgroundColor: colors.white, borderRadius: 10, elevation: 5, marginVertical: 10 }}>
            <Picker
              ref={pickerRef}
              placeholder='Categoria'
              selectedValue={categoria}
              onValueChange={(value) =>
                setCategoria(value)
              }
            >
              {listaCateg && listaCateg.map((item, index) => <Picker.Item key={index} label={item.nome} value={item.cod_categoria} />)}
            </Picker>
          </View>
          <TextInput
            style={globalStyle.input}
            placeholder='Tempo de preparo(em minutos)'
            inputMode='numeric'
            value={tempo}
            onChangeText={setTempo}
          />
          <View style={{ width: '100%' }}>
            <Text style={[globalStyle.subTitle, { marginVertical: 10 }]}>Ingredientes</Text>
            {ingredientes && ingredientes?.map((item, index) => renderIngredient(item, index))}
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Icon
              reverse
              name='add'
              size={25}
              color={colors.blue}
              onPress={insertIngredient}
            />
          </View>
          <TextInput
            style={[globalStyle.input, { height: 200 }]}
            placeholder='Modo de preparo'
            textAlignVertical='top'
            value={preparo}
            onChangeText={setPreparo}
          />
          <TouchableOpacity style={globalStyle.button} onPress={salvar}>
            <Text style={[globalStyle.subTitle, globalStyle.white]}>Salvar</Text>
          </TouchableOpacity>
          {/* {
            route.params.cod_receita &&
            <TouchableOpacity style={globalStyle.button} onPress={apagar}>
              <Text style={[globalStyle.subTitle, globalStyle.white]}>Apagar</Text>
            </TouchableOpacity>
          } */}
        </View>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  )
}