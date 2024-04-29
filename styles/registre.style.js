import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
    },
    flecha_posicion: {
      position: 'absolute',
      left: 10,
      top: 20,
    },
    flecha: {
      color: "#bc6c25",
      fontSize: 45,
    },
    logo: {
      //la relacion es 498width/322height
      width: 393,
      height: 254,
    },
    error_message: {
      fontSize: 19,
      marginTop: 25,
      color: "#ff0000"
    },
    correo: {
      marginTop: 15,
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 2, 
      borderColor: '#bc6c25', 
      borderRadius: 5, 
      padding: 5, 
    },
    texto_correo: {
      fontSize: 18,
      width: 270,
      height: 30,
      color: "#bc6c25"
    },
    contrasenya: {
      marginTop: 40,
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 1, 
      borderColor: 'black', 
      borderRadius: 5, 
      padding: 5,
    },
    texto_contrasenya: {
      fontSize: 18,
      width: 270,
      height: 30,
      color: "black"
    },
    visibilidad: { 
      position: 'absolute', 
      right: 10,
    },
    recuerdate: {
      marginTop: 5,
      marginLeft: 140,
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 5,
    },
    registro: {
      marginTop: 60,
      width: 280,
      height: 40,
      alignItems: 'center',
      backgroundColor: "#bc6c25",
      borderRadius: 10,
    },
    registro_texto: {
      marginTop: 8,
      fontSize: 20,
      color: "white",
      fontWeight: 'bold'
    },
});

export default STYLES;