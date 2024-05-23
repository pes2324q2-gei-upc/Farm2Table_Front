import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants/theme';
const styles = StyleSheet.create({
  lista:{
      flexDirection:"row",
      alignItems: "center",
      marginLeft: 10,
      marginTop: 10,
      width: (SIZES.width/100) *90,
      height: 100,
      backgroundColor: 'transparent',
  },
  info: {
      width: '100%',
      backgroundColor: COLORS.secondary,
      height: SIZES.height/100,
      flex:1,
  }, 
  top: {
      width: '100%',
      backgroundColor: COLORS.secondary,
      height: (SIZES.height/100)*10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  bottom: {
      width: '100%',
      backgroundColor: COLORS.primary,
      height: (SIZES.height)/100*80,
      paddingTop: 30,
      alignItems: 'center',
      backgroundColor: COLORS.primary
  },
  searchBar:{
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: 'white',
      borderRadius: 15,
      width: (SIZES.width)/100 *90,
  },
  boton: {
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginRight: 15,
      backgroundColor: 'transparent'
  },
  row: {
      paddingTop: 10,
      maxHeight: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%',
      paddingBottom: 20,
      backgroundColor: 'transparent'
  },
  text: {
      fontSize: SIZES.xsmall,
      fontWeight: 'bold'
  },
  image: {
      width: 70,
      height: 70,
      borderRadius: 25,
  },
  textName: {
      fontSize: SIZES.xlarge,
      marginLeft: 10,
      fontWeight: '600'
  },
  textEmail: {
      fontSize: SIZES.large,
      marginLeft: 10,
      color: "grey"
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    //backgroundColor: 'pink',
  },
  activityIndicator: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});

export default styles;
