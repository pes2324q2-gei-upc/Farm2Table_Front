import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: '#fefae0',
    },
    logo: {
      //la relacion es 498width/322height
      width: 393,
      height: 254,
    },
    escollir_usuari: {
        marginTop: 10,
        fontSize: 40,
        color: '#bc6c25',
        fontWeight: 'bold'
    },
    productor: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#6d9461',
        borderRadius: 10,
    },
    minorista: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#86af7e',
        borderRadius: 10,
    },
    particular: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        backgroundColor: '#a8d5a2',
        borderRadius: 10,
    },
    titulo: {
        marginTop: 10,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    texto: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold',
    },
});

export default STYLES;