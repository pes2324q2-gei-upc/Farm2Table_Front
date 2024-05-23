import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { COLORS, SIZES } from "../constants/theme";


const ProductList = ({navigation, shopData }) => {
    return (
        <FlatList   
        data={shopData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (     
            <View style={styles.lista}>
                <TouchableOpacity>
                <View style={styles.capsule}>
                    <View style={styles.vista_imagen}>
                        <Image source = {{uri: item.image}} style={styles.image} />
                    </View>
                    <View style={styles.infoProducto}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price} €/kg</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )}
    />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        flex: 1, 
        paddingTop: (SIZES.height/100) * 8, 
    },
    container2: {
        height: (SIZES.height/100)*64.5,
        backgroundColor: COLORS.primary,
        width:'100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingHorizontal: SIZES.padding,
        backgroundColor: 'transparent'
    },
    button: {
        alignItems: "center",
        height: 40,
        borderBottomWidth: 2,
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: SIZES.xlarge
    },
    imageContainer: {
        width: 100, 
        height: 100,
        borderRadius: 75,
        overflow: 'hidden', 
        borderWidth: 5, 
        borderColor: COLORS.tertiary, 
        position: 'absolute',
    },
    image_profile: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: (SIZES.height/100) * 14,
    },
    info: {
        position: 'absolute',
        right: 20,
        width: '60%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    ajustes: {
        position: 'absolute',
        right:(SIZES.width/100) * 7,
        top: (SIZES.height/100) * -1,
        width: '10%',
        height: '35%',
        backgroundColor: 'transparent',
    },
    nombre: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2,
        fontWeight: 'bold',
        paddingBottom:  (SIZES.height/100) * 1,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    locationText: {
        color: 'white',
        fontSize:  (SIZES.height/100) * 2, 
        marginLeft: 1,
    },
    width:{
        width: SIZES.width - 20,
    },
    lista:{
        marginTop: 12,
        width:(SIZES.width/100)*100,
        height: (SIZES.height/100)*20,  
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 135, 
        height: 135,
        resizeMode: 'contain',
        position: 'absolute', 
    },
    capsule: {
        maxWidth: '75%',
        maxHeight: '95%',
        justifyContent: 'center',
        borderColor: COLORS.secondary,
        borderWidth: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
    },
    infoProducto: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
        paddingHorizontal: 10
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: COLORS.secondary, 
        paddingHorizontal: 10
    },
    vista_imagen: {
        width: '75px',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ProductList;
