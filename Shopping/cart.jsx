import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBack from '../navigation/header_back';
import styles from '../styles/cart.style'; // Ensure this path is correct

const CartScreen = () => {
    const cartItems = [
        {
            "storeId": "store1",
            "storeName": "Store 1",
            "storePicture": "https://www.caprabo.com/export/shared/.galleries/articulos/caprabo.png_940553528.png",
            "items": [
                {
                    "productId": "product1",
                    "name": "Product 1",
                    "quantity": 2,
                    "price": 10.00
                },
                {
                    "productId": "product2",
                    "name": "Product 2",
                    "quantity": 1,
                    "price": 15.00
                }
            ]
        },
        {
            "storeId": "store2",
            "storeName": "Store 2",
            "storePicture": "https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png",
            "items": [
                {
                    "productId": "product3",
                    "name": "Product 3",
                    "quantity": 1,
                    "price": 20.00
                }
            ]
        }
    ];

    const calculateTotal = (items) => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack />
            <ScrollView style={styles.content}>
                {cartItems.map((store) => (
                    <View key={store.storeId} style={styles.storeContainer}>
                        <View style={styles.user_info_container}>
                            {store.storePicture && (
                                <Image source={{ uri: store.storePicture }} style={styles.user_image} />
                            )}
                            <Text style={styles.user_name}>{store.storeName}</Text>
                        </View>
                        {store.items.map(item => (
                            <View key={item.productId} style={styles.itemContainer}>
                                <View style={styles.itemInfoContainer}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDetails}>Quantitat: {item.quantity}</Text>
                                    <Text style={styles.itemDetails}>Preu: {item.price.toFixed(2)}€</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.removeButton} 
                                    onPress={() => handleRemoveItem(store.storeId, item.productId)}
                                >
                                    <Text style={styles.removeButtonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total: {calculateTotal(store.items).toFixed(2)}€</Text>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Comprar Ahora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartScreen;
