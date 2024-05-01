import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
      position: 'relative',
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
      marginTop: 10,
      color: "#ff0000"
    },
    productor: {
        flexDirection: 'column',
        marginTop: 5,
        width: 325,
        height: 370,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#6d9461',
        borderRadius: 10,
    },
    titulo: {
        marginTop: 10,
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
    },
    texto: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    comensa: {
        marginTop: 20,
        backgroundColor: '#bc6c25',
        width: 250,
        height: 45,
        borderRadius: 10,
        elevation: -1,
    },
    texto_comensa: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 8,
    },
    desplegable: {
        top: 120,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1
    },
    desplegable2: {
        top: 180,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable3: {
        top: 240,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable4: {
        top: 300,
        left: 24,
        position: 'absolute',
        bottom: 100,
        width: 140,
        height: 100,
        elevation: -1,
    },
    desplegable1: {
        width: 280,
        height: 55,
        justifyContent: 'top',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
    },
    sector_texto: {
        fontSize: 20,
        color: '#749969',
        marginLeft: 0,
        fontWeight: 'bold',
    },
    sector_textos: {
        fontSize: 16,
        color: '#749969',
        fontWeight: 'bold',
    },
    fondo_nif: {    
        marginTop: 25,
        width: 280,
        height: 40,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    nif: {
        fontSize: 20,
        color: '#749969',
        fontWeight: 'bold',
        right: 20,
        width: 220,
        height: 40
    },
    fondo_favorits: {   
        width: 280,
        height: 50,
        position: 'absolute',
        top: 560,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    favorits: {
        fontSize: 20,
        color: '#749969',
        fontWeight: 'bold',
        width: 280,
        height: 50
    },
    texto_favorits: {
        fontSize: 18,
        color: '#749969',
        fontWeight: 'bold',
    },
});

export default STYLES;