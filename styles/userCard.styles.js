import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    capsule: {
        padding: 20,
        width: '90%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    usernameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    username: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
    },
    telephoneContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    telephone: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    description: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    reach: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
    },
    botonEditar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    boton: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '90%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%'
    },
});

export default styles;