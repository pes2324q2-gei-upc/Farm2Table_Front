import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    productsListContent: {
        alignItems: 'center', // Apply the alignment as necessary, 'stretch' is just an example
      },
    container_green: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    ticket: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        maxHeight: '70%'
    },
    ticket2: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    storeName: {
        fontSize: 20,
        fontFamily: 'ticket', // Ensure this font is correctly linked in your React Native project
        textAlign: 'center'
    },
    storeAddress: {
        fontSize: 18,
        fontFamily: 'ticket',
        textAlign: 'center',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 30,
        width: '100%',

    },
    headerText: {
        fontSize: 18,
        fontFamily: 'ticket',
        fontWeight: 'bold',
        width: '30%',
        textAlign: 'right',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10, // Adjust this value if needed
        paddingRight: 20,
        width: '100%',
        marginBottom: 10,
        
    },
    tableText: {
        fontSize: 18,
        width: '30%',
        textAlign: 'right',
        paddingRight: 10,
        fontFamily: 'ticket',
    },
    total: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    button: {
        marginTop: 10,
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    productName: {
        fontSize: 18,
        fontFamily: 'ticket',
        width: '50%', // Adjust if needed to fit
    },
    producteHeader: {
        width: '50%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10, // Adjust this value to match your ticket's padding
        paddingRight: 0,
        width: '100%',
        marginTop: 5, // Adjust if you want more space above the total line
        marginBottom: 20,
    },
    subtotal: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'ticket',
    },
    button_container:{
        marginHorizontal: 20,
    }
});

export default styles;