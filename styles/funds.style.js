import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.secondary,
    },
    content: {
      flex: 1,
      justifyContent: 'center',  // Vertically center content within the flex container
      alignItems: 'center',      // Horizontally center content
      backgroundColor: COLORS.primary,
      padding: 20,               // Add padding around the content
    },
    displayContainer: {
      flexDirection: 'row',      // Align digits horizontally
      marginBottom: 20,
      padding: 10,
      justifyContent: 'center',  // Center the digits horizontally
    },
    digitContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: COLORS.sombra,
      width: 55,  // Dark background for each capsule
      borderRadius: 10,          // Rounded borders for capsule effect
      marginHorizontal: 5,
      padding: 5,
      borderWidth: 2,
    },
    digit: {
      fontSize: 44,
      textAlign: 'center',
      fontWeight: 'bold',
      color: COLORS.secondary,            // Light color for the numbers
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    button_add: {
      backgroundColor: COLORS.secondary,
      padding: 10,
      paddingVertical: 15,
      borderRadius: 5,
      marginHorizontal: 5,
      width: 100,
    },
    button_text: {
      color: COLORS.primary,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 22,
    },
    button_end: {
        marginTop: 20,
        backgroundColor: COLORS.tertiary,
        padding: 10,
        borderRadius: 5,
        width: '92%',
    },
});

export default styles;