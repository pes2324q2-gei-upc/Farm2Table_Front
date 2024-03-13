import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from '../constants/theme';


const styles = StyleSheet.create({

    container :{
        flex: 1,
        backgroundColor: COLORS.primary
    },

    upperRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: SIZES.xxlarge,
        width: SIZES.width -44,
        height: 44,
        zIndex: 999,
        marginHorizontal: 20,
        marginTop: 8,
    },

    image: {
        aspectRatio: 1,
        resizeMode: 'cover',
    },

    card: {
        marginTop: -38,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        width: SIZES.width,
    },

    name_price: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        textAlignVertical: "center",
        marginTop: 20,
    },

    name: {
        fontFamily: "bold",
        fontSize: SIZES.xlarge,
        marginRight: 30,
    },

    price: {
        fontFamily: "bold",
        fontSize: SIZES.large,
        color: COLORS.secondary
    },

    priceStyle: {
        backgroundColor: COLORS.highlighter,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        textAlignVertical: "center",
    },

    userrow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginHorizontal: 20,
        marginTop: 20,
    },

    user_image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.secondary,
    },

    user_name: {
        fontFamily: "bold",
        fontSize: SIZES.large,
        marginLeft: 10,
        maxWidth: 200,
    },

    description_row: {
        marginHorizontal: 20,
        marginTop: 20,
        maxHeight: 150,
    },

    description: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        textAlign: "justify",
    },

    button_row: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
    },

    button: {
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        padding: 10,
        width: SIZES.width - 40,
        alignItems: "center",
    },

    button_text: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
        color: COLORS.white,
    },

    quanity_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        textAlignVertical: "center",
        marginTop: 10,
        width: SIZES.width - 40,
    },

    user_info_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
    },

    rating_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        textAlignVertical: "center",
        marginTop: 20,
        width: 80,
    },

    quantity: {
        fontFamily: "regular",
        fontSize: SIZES.large,
    },

    quantity_button: {
        backgroundColor: COLORS.highlighter,
        maxHeight: 25,
        borderRadius: 10,
        padding: 1
    },


    
})

export default styles; 