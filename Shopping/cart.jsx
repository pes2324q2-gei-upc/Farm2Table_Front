import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBack from '../navigation/header_back';
import { loadCart, saveCart, removeItemFromCart } from '../informacion/cartInfo';
import styles from '../styles/cart.style';
import { userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const initializeCart = async () => {
            const loadedCart = await loadCart(userId());
            setCartItems(loadedCart);
        };

        initializeCart();
    }, []);

    const handleRemoveItem = async (storeId, productId) => {
        const updatedCart = removeItemFromCart(cartItems, storeId, productId);
        setCartItems(updatedCart);
        await saveCart(updatedCart); // Asumiendo que saveCart solo necesita el carrito actualizado
    };

    const handleBuyNow = (storeId, items) => {
        console.log('Buy now', storeId, items);
        if (!storeId || !items || items.length === 0) {
            console.error("Datos inválidos: Store ID o Items están vacíos");
            // Aquí puedes optar por mostrar un mensaje al usuario, manejar el error o simplemente no navegar.
            return;
        }
    
        navigation.navigate('Ticket', {
            storeId: storeId,
            items: items
        });
    }

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
                            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(store.storeId, store.items)}>
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