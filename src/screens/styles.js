import { StyleSheet } from 'react-native';
import colors from '../utils/colors';
import { Dimensions } from 'react-native';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.black, 
    marginBottom: 20
  },
  subTitle: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: colors.black,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    // marginVertical: 10,
    elevation: 5,
    padding: 10,
  },
  button: {
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginVertical: 20,
    padding: 5
  },
  buttonMenu: {
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    marginVertical: 20,
    padding: 5
  },
  anchorButton:{
    position: 'absolute',
    bottom: 20,
    right: 5
  },
  back:{
    position: 'absolute',
    top: 20,
    right: 5
  },
  imageAddButton:{
    position: 'absolute',
    bottom: 0,
    right: 5
  },
  white: {
    color: colors.white
  },
  marginTop: {
    marginTop: 10
  },
  cardIngredient:{    
    marginVertical: 3,
    paddingBottom: 8,
    borderColor: colors.elevation,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderRightWidth: 1,
    paddingRight: 5
  }
})