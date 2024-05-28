import React, {useState, useEffect} from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import { COLORS } from '../constants/theme'; // Adjust the import path as needed
import HeaderHome from '../navigation/header_backHome';
import ConfirmModal from '../PopUps/endPurchase';
import AddFundsModal from '../PopUps/insufficientFunds';
import OutOfStockModal from '../PopUps/outOfStock';
import { userId, getPalabra } from '../informacion/User';
import { loadCart, removeStoreFromCart } from '../informacion/cartInfo';
import styles from '../styles/ticket.styles'; // Adjust the import path as needed
import { fetchUserFunds, fetchProductStock, buyProduct, processPurchase } from '../api_service/API_Cart';
import { saveCart } from '../informacion/cartInfo';

const Ticket = ({ navigation, route }) => {
    const USERID = userId();
    const { items, storeId } = route.params; // Asegúrate de que los nombres de las propiedades coincidan con los que se pasan desde la pantalla de carrito
    const storeName = "Best Store Ever"; // Este valor debería ser dinámico si tienes varios almacenes
    const storeAddress = "123 Shopping Ln, Retail City"; // Esto también debería venir de los datos del almacén
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [fundsModalVisible, setFundsModalVisible] = useState(false);
    const [stockModalVisible, setStockModalVisible] = useState(false);
    const [stockDetails, setStockDetails] = useState({ productName: '', quantityLeft: 0 });
    const [userAccountFunds, setUserFunds] = useState(0);

    useEffect(() => {

    }, [userAccountFunds]);

    const handlePurchase = async () => {
        // Verificar si hay suficientes fondos
        const userId = USERID;
        const userFunds = await fetchUserFunds(userId);
        const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2); 
        if (userFunds < total) {
            setUserFunds(userFunds);
            setTimeout(() => {
                setFundsModalVisible(true);
            }, 0);
            return;
        }

        // Verificar si hay suficiente stock
        for (let i = 0; i < items.length; i++) {
            const stock = await fetchProductStock(items[i].productId);
            if (stock.quantity < items[i].quantity) {
                setStockDetails({ productName: stock.name, quantityLeft: stock.quantity });
                setStockModalVisible(true);
                return;
            }
        }

        //Comprar y cobrar producto a producto 
        for (let i = 0; i < items.length; i++) {
            const product = items[i];
            const price = Math.round(product.price*product.quantity);
            const purchaseData = [
                {
                    buyer_id: userId,
                    seller_id: storeId,
                    product_id: product.productId,
                    price: price,
                    date: new Date().toISOString(),
                    quantity: product.quantity,
                    unit: 0
                }
            ];
            
            
            const buy = await buyProduct(product.productId, product.quantity);
            const pay = await processPurchase(purchaseData);
        }
        // Mostrar modal de confirmación
        setConfirmModalVisible(true);

        // Borrar carrito
        let cart = await loadCart(userId);
        cart = removeStoreFromCart(cart, storeId);
        await saveCart(userId, cart);
    }
    

    const getTotal = () => {
        return items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    };
    
    return (
        <SafeAreaView style={styles.container_green}>
            <HeaderHome />
            <ScrollView style={styles.container}>
                <ScrollView style={styles.ticket} contentContainerStyle={styles.productsListContent}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.storeAddress}>{storeAddress}</Text>

                    <Text>------------------------------------------------</Text>
                    <View style={styles.tableHeader}>
                    <Text style={styles.producteHeader}>{getPalabra('product')}</Text>
                        <Text style={styles.headerText}>{getPalabra('quantity')}</Text>
                        <Text style={styles.headerText}>{getPalabra('price')}</Text>
                    </View>
                    <Text>------------------------------------------------</Text>
                    {items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.tableText}>{item.quantity}</Text>
                            <Text style={styles.tableText}>{item.price.toFixed(2)} €</Text>
                        </View>
                    ))}
                    <Text>------------------------------------------------</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total:</Text>
                        <Text style={styles.subtotal}>{getTotal()}€</Text>
                    </View>
                </ScrollView>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.button}  onPress={handlePurchase}>
                        <Text style={styles.buttonText}>Finalizar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ConfirmModal modalVisible={confirmModalVisible} setModalVisible={setConfirmModalVisible} navigation={navigation} />
            <AddFundsModal modalVisible={fundsModalVisible} setModalVisible={setFundsModalVisible} navigation={navigation} actualfunds={userAccountFunds} />
            <OutOfStockModal 
                modalVisible={stockModalVisible} 
                setModalVisible={setStockModalVisible} 
                navigation={navigation} 
                productName={stockDetails.productName} 
                quantityLeft={stockDetails.quantityLeft} 
            />
        </SafeAreaView>
    );
};
export default Ticket;
