import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from '../constants/theme';


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderWidth: 3,
      borderColor: COLORS.secondary,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10,
      width: 200,
    },
    buttonCart: {
      backgroundColor: COLORS.secondary,
    },
    buttonBack: {
      backgroundColor: COLORS.white,
      borderWidth: 2,
      borderColor: COLORS.secondary,
    },
    buttonDelete: {
      backgroundColor: COLORS.error,
    },
    buttonShop: {
      backgroundColor: COLORS.tertiary,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    buttonTextBlack: {
      color: COLORS.secondary,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
});

export default styles; 