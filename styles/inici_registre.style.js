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
    cambio_idioma: {
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        position: 'absolute',
        right: 32,
        top: 40,
    },
    base_banderas_desplegable: {
        position: 'absolute', 
        right: 27, 
        top: 80, 
        backgroundColor: '#bc6c25', 
        alignItems: 'center'
    },
    fondo_banderas: {width: 50, height: 120, alignItems: 'center'},
    bandera: {
        width: 40,
        height: 28
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
    contrasenya_olvidada: {
        marginTop: 20,
        color: "#bc6c25",
        fontSize: 18,
    },
    inicio_sesion: {
        marginTop: 40,
        width: 280,
        height: 40,
        alignItems: 'center',
        backgroundColor: "#bc6c25",
        borderRadius: 10,
    },
    registro: {
        marginTop: 60,
        width: 280,
        height: 40,
        alignItems: 'center',
        backgroundColor: "#bc6c25",
        borderRadius: 10,
      },
    inicio_registro_texto: {
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
    //ESCOLLIR USUARI
    escollir_usuari: {
        marginTop: 10,
        fontSize: 40,
        color: '#bc6c25',
        fontWeight: 'bold'
    },
    base_tipos: {
        marginTop: 25,
        width: 350,
        height: 100,
        justifyContent: 'top',
        borderRadius: 10,
    },
    productor: { backgroundColor: '#6d9461' },
    minorista: { backgroundColor: '#86af7e' },
    particular: { backgroundColor: '#a8d5a2' },
    base_texto: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    titulo_tipos: { fontSize: 25 },
    texto_tipos: {fontSize: 18},
    //PRODUCTOR/MINORISTA/PARTICULAR
    base_recuadros: {
        flexDirection: 'column',
        marginTop: 5,
        width: 325,
        height: 370,
        justifyContent: 'top',
        alignItems: 'center',
        borderRadius: 10,
        elevation: -2
    },
    //Con base texto
    titulo_registro_tipos: { fontSize: 35 },
    texto_registro_tipos: { fontSize: 18, textAlign: 'center' },
    texto_comensa: { fontSize: 22, right: 5 },
    base_fondo_datos: {
        width: 280,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    fondo_input_datos: { marginTop: 20 },
    fondo_favorits: { position: 'absolute', top: 580 },
    fondo_servicio: { position: 'absolute', top: 510 },
    base_texto_datos: {
        fontSize: 20,
        color: '#749969',
        fontWeight: 'bold',
        height: 50
    },
    texto_input_datos: { width: 220, right: 20 },
    texto_recuadros_datos: { width: 280, right: 20 },
    productos_favoritos: {
        selectedItemText:{color: '#749969'},
        selectToggleText:{color: '#749969', fontWeight:'bold'},
        item:{backgroundColor: '#fefae0'},
        selectedItem:{backgroundColor: '#fefae0'},
        container:{backgroundColor: '#fefae0'}
    },
    box_lista: { width: 280, height: 50 },
    texto_lista: { fontSize: 16, color: '#749969', fontWeight: 'bold' },
    fondo_boton_comensa: {
        marginTop: 20,
        backgroundColor: '#bc6c25',
        width: 250,
        height: 50,
        borderRadius: 10,
        elevation: -1,
        alignItems: 'center'
    },
});

export default STYLES;