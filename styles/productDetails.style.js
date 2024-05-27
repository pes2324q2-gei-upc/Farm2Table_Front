import { StyleSheet } from 'react-native';
import {COLORS, SIZES} from '../constants/theme';


const styles = StyleSheet.create({

    container :{
        flex: 1,
        backgroundColor: COLORS.secondary
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
        resizeMode: 'cover',
        alignContent: "center",
        alignItems: "center",
        height: SIZES.height * 0.4,
        width: SIZES.width,
    },

    card: {
        marginTop: -38,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        width: SIZES.width,
        flex: 1,
        height: SIZES.height * 0.5,
        bottom: 10
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
        fontSize: SIZES.large,
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
        marginHorizontal: 5,
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
        fontSize: SIZES.medium,
        marginLeft: 10,
        maxWidth: 200,
    },

    description_row: {
        marginHorizontal: 20,
        marginTop: 20,
        maxHeight: 75,
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
        justifyContent: "space-between", // Distribute items evenly along the row
        alignItems: "center", // Vertically align the items
        marginHorizontal: 20,
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
        alignItems: "center", // Vertically align the items
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
        borderRadius: 10,
        padding: 3,
      },
      flyingItem: {
        position: 'absolute',
        right: 50,  // Ajusta según donde esté el botón de añadir al carrito
        bottom: 10
      },
    button_bottom_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        alignItems: "center",
        marginTop: 20,
    },
    buttonLove: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: SIZES.width*0.7,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageContainer: {
        position: 'relative',
      },
      quantityPill: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      quantityPillText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
      },


    
})

export default styles; 