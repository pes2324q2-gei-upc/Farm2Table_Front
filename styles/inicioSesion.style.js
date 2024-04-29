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
    error_message: {
        fontSize: 19,
        marginTop: 25,
        color: "#ff0000"
    },
    correo: {
        marginTop: 30,
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
    contrasenya_olvidada: {
        marginTop: 20,
        color: "#bc6c25",
        fontSize: 18,
    },
    inicio_sesion: {
        marginTop: 20,
        width: 280,
        height: 40,
        alignItems: 'center',
        backgroundColor: "#bc6c25",
        borderRadius: 10,
    },
    inicio_sesion_texto: {
        marginTop: 8,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold'
    },
    o: {
        fontSize: 15,
        marginTop: 10,
    },
    inicio_google: {
        marginTop: 10,
        width: 280,
        height: 40,
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    google: {
        //la relacion es 1 a 1
        width: 20,
        height: 20,
        position: 'absolute',
        left: 10,
        marginTop: 10,
    },
    inicio_google_texto: {
        marginTop: 10,
        fontSize: 14,
        color: "#cc8f58",
        fontWeight: 'bold'
    },
    crear_cuenta: {
        flexDirection: "row",
        marginTop: 20,
    },
    crear_cuenta_boton: {
        marginLeft: 20,
    },
});

export default STYLES;