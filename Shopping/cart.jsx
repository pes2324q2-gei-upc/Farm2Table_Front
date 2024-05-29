import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderHome from '../navigation/header_backHome';
import { loadCart, saveCart, removeItemFromCart, clearAllData, changeQuantity } from '../informacion/cartInfo';
import styles from '../styles/cart.style';
import { getPalabra, userId } from '../informacion/User';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import QuantitySelector from '../components/quantity';
import { initial } from 'lodash';
import DeleteConfirmationModal from '../PopUps/deleteItem';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        const initializeCart = async () => {
            const loadedCart = await loadCart(userId());
            setCartItems(loadedCart);
        };
        initializeCart();
    }, []);

    const handleOpenDeleteModal = (storeId, productId) => {
        setSelectedItem({ storeId, productId });
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        const { storeId, productId } = selectedItem;
        const updatedCart = removeItemFromCart(cartItems, storeId, productId);
        setCartItems(updatedCart);
        saveCart(userId(), updatedCart);
    };

    const handleRemoveItem = async (storeId, productId) => {
        const updatedCart = removeItemFromCart(cartItems, storeId, productId);
        setCartItems(updatedCart);
        await saveCart(userId(), updatedCart); // Asumiendo que saveCart solo necesita el carrito actualizado
    };

    const handleBuyNow = (storeId, items) => {
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

    const handleQuantityChange = (storeId, productId, change) => {
        const updatedCart = changeQuantity(cartItems, storeId, productId, change);
        setCartItems(updatedCart);
        saveCart(userId(), updatedCart);
    };

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderHome />
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>{getPalabra("empty_cart")}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const calculateTotal = (items) => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderHome />
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
                                <QuantitySelector
                                    count={item.quantity}
                                    increment={() => handleQuantityChange(store.storeId, item.productId, 1)}
                                    decrement={() => handleQuantityChange(store.storeId, item.productId, -1)}
                                />
                                <TouchableOpacity 
                                    style={styles.removeButton} 
                                    onPress={() => handleOpenDeleteModal(store.storeId, item.productId)}
                                >
                                    <Ionicons name="trash" size={24} color={COLORS.primary}/>
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
            <DeleteConfirmationModal
                modalVisible={deleteModalVisible}
                setModalVisible={setDeleteModalVisible}
                handleConfirmDelete={handleConfirmDelete}
            />
        </SafeAreaView>
    );
};

export default CartScreen;