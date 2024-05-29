import { StyleSheet, Dimensions } from 'react-native';
import { SIZES } from '../constants/theme';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      ...StyleSheet.absoluteFillObject,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      width:"100%",
      height: "100%",
    },
    searchTab:{
      position: 'absolute', 
      top: '10%',
      width: '100%',
    },
    filtros: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scroll: {
      position: 'absolute',
      //backgroundColor: 'blue',
      top: '10%',
      paddingHorizontal: 20
    },
    filtro: {
      flexDirection:"row",
      backgroundColor:'#fff', 
      borderRadius:20,
      padding:8,
      paddingHorizontal:20, 
      marginHorizontal:10,
      height:35,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    flecha: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32
    },
    flecha_border: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#007a87',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5
    },
    name: {
      fontSize: 16,
      marginBottom: 5
    },
    imagen: {
      width: 120,
      height: 80
    },
    searchBar:{
      paddingHorizontal: 10,
      //paddingVertical: 10,
      //paddingBottom: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: 'white',
      borderRadius: 15,
      width: (SIZES.width)/100 *90,
      height: SIZES.height/100*5,
      alignSelf: 'center',
      alignItems: 'center'
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default STYLES;