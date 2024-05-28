import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCart = async (userId) => {
    const storageKey = `@cart_user_${userId}`;
    const storedData = await AsyncStorage.getItem(storageKey);
    const data = storedData ? JSON.parse(storedData) : {};
    if (data.userId === userId.toString()) {
        return data.cart;
    } else {
        console.log('No valid cart data found for user:', userId, 'or data mismatch.');
    }
    return [];
};


export const saveCart = async (userId, cartItems) => {
    const cartData = {
        userId: userId.toString(), // Ensure userId is a string
        cart: cartItems
    };
    const storageKey = `@cart_user_${userId}`; // Dynamic key based on userId
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(cartData));
    } catch (error) {
        console.error('Failed to save cart for user:', userId, 'Error:', error);
    }
};



export const verifyCartOnLogin = async (currentUser) => {
    const storedData = await AsyncStorage.getItem('@cart_user');
    const data = storedData ? JSON.parse(storedData) : null;
    if (data && data.userId !== currentUser.id.toString()) {  // Asegúrate de comparar como strings o números consistentemente
        await AsyncStorage.removeItem('@cart_user');
        return [];
    } else if (data && data.cart) {
        return data.cart;
    }
    return [];
};

export const removeItemFromCart = (cartItems, storeId, productId) => {
    const updatedCart = cartItems.map(store => {
        if (store.storeId === storeId) {
            const filteredItems = store.items.filter(item => item.productId !== productId);
            if (filteredItems.length === 0) {
                // If no items left in the store, do not include this store in the updated cart
                return null;
            }
            return { ...store, items: filteredItems };
        }
        return store;
    }).filter(store => store !== null);  // Remove any null entries, which indicate empty stores

    return updatedCart;
};


export const changeQuantity = (cartItems, storeId, productId, change) => {
    const updatedCart = cartItems.map(store => {
        if (store.storeId === storeId) {
            const updatedItems = store.items.map(item => {
                if (item.productId === productId) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > 0) {  // Asegura que la cantidad nunca sea menor que 1
                        return { ...item, quantity: newQuantity };
                    }
                }
                return item;
            });
            return { ...store, items: updatedItems };
        }
        return store;
    });
    return updatedCart;
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Failed to clear AsyncStorage:', error);
    }
};

export const addProductToCart = (cartItems, storeId, newProduct, storeName, storeAvatar) => {
    let storeFound = false;
    const updatedCart = cartItems.map(store => {
        if (store.storeId === storeId) {
            storeFound = true;
            let productFound = false;
            const updatedItems = store.items.map(item => {
                if (item.productId === newProduct.productId) {
                    productFound = true;
                    return { ...item, quantity: item.quantity + newProduct.quantity };
                }
                return item;
            });

            if (!productFound) {
                updatedItems.push(newProduct);
            }
            
            return { ...store, items: updatedItems };
        }
        return store;
    });

    if (!storeFound) {
        updatedCart.push({
            storeId: storeId,
            storeName: storeName,
            storePicture: storeAvatar,
            items: [newProduct]
        });
        
    }

    return updatedCart;
};

export const removeStoreFromCart = (cartItems, storeId) => {
    const updatedCart = cartItems.filter(store => store.storeId !== storeId);
    return updatedCart;
};

