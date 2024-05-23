import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCart = async (userId) => {
    const storageKey = `@cart_user_${userId}`;
    console.log('Attempting to load cart from AsyncStorage with key:', storageKey);
    const storedData = await AsyncStorage.getItem(storageKey);
    console.log('Data retrieved from AsyncStorage:', storedData);
    const data = storedData ? JSON.parse(storedData) : {};
    if (data.userId === userId.toString()) {
        console.log('Loaded cart data is valid for user:', userId);
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
    console.log('Saving cart for user:', userId, 'Cart items:', cartItems);
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(cartData));
        console.log('Cart successfully saved for user:', userId);
    } catch (error) {
        console.error('Failed to save cart for user:', userId, 'Error:', error);
    }
};



export const verifyCartOnLogin = async (currentUser) => {
    const storedData = await AsyncStorage.getItem('@cart_user');
    console.log('Verifying cart at login for user:', currentUser.id, 'Data retrieved:', storedData);
    const data = storedData ? JSON.parse(storedData) : null;
    if (data && data.userId !== currentUser.id.toString()) {  // Asegúrate de comparar como strings o números consistentemente
        console.log('User ID mismatch, clearing cart.');
        await AsyncStorage.removeItem('@cart_user');
        return [];
    } else if (data && data.cart) {
        return data.cart;
    }
    return [];
};

export const removeItemFromCart = (cartItems, storeId, productId) => {
    console.log('Removing item from cart:', productId, 'from store:', storeId);
    const updatedCart = cartItems.map(store => {
        if (store.storeId === storeId) {
            const filteredItems = store.items.filter(item => item.productId !== productId);
            console.log('Updated items after removal:', filteredItems);
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
        console.log('All AsyncStorage data cleared successfully');
    } catch (error) {
        console.error('Failed to clear AsyncStorage:', error);
    }
};

export const addProductToCart = (cartItems, storeId, newProduct, storeName, storeAvatar) => {
    console.log('Adding product to cart:', newProduct, 'in store:', storeId);
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
            console.log('Updated items in store after adding:', updatedItems);
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
        console.log('Added new store to cart because it was not found:', updatedCart);
    }

    return updatedCart;
};

export const removeStoreFromCart = (cartItems, storeId) => {
    console.log('Removing store from cart:', storeId);
    const updatedCart = cartItems.filter(store => store.storeId !== storeId);
    console.log('Updated cart after removing store:', updatedCart);
    return updatedCart;
};

