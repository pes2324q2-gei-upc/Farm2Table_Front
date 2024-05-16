import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants/theme';

const styles = StyleSheet.create({
  safe: {
      width: '100%',
      backgroundColor: COLORS.secondary,
      //paddingTop: SIZES.height/1,
      flex:1,
  },
  vista: {
      backgroundColor: 'brown',
      height: SIZES.height,
  },
  cabecera: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: SIZES.height/7
  },
  restaurantName: {
      fontSize: 30, // Adjust the font size as needed
      //fontWeight: 'bold', // Add additional text styles as needed
      marginLeft: 20,
      color: COLORS.primary,
      //backgroundColor: 'red',
      width: SIZES.width/100*70
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      paddingHorizontal: SIZES.padding,
      backgroundColor: 'transparent'
  },
  button: {
      alignItems: "center",
      height: 40,
      borderBottomWidth: 2,
  },
  buttonText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontSize: SIZES.xlarge
  },
});
export default styles