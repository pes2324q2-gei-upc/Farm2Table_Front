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
      top: '18%',
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
    }
  });

export default STYLES;