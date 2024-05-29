import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from '../constants/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    content: {
        backgroundColor: COLORS.primary,
        padding: 5,
    },
    storeContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemInfoContainer: {
        flex: 1,  // Takes all available space, pushing the button to the right
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemDetails: {
        fontSize: 14,
    },
    removeButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.tertiary,  // Red to signify deletion or removal
        padding: 5,
        borderRadius: 5,
        marginLeft: 15,
    },
    user_info_container: {
        flexDirection: "row",
        alignItems: "center",  
        justifyContent: "flex-start", 
        marginBottom: 10,
        padding: 10,
    },
    user_image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        marginRight: 10,
    },
    user_name: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.secondary, 
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buyButton: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16, 
        fontWeight: 'bold'
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
});

export default styles;