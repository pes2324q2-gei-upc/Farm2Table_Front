import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
    },
    usernameLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 5,
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
        marginBottom: 10,    
    },
    telephone: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 0,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        height: 40,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: SIZES.xlarge,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        maxHeight: '86.5%'
    },
    tabTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default styles;