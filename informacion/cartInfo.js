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
    return cartItems.map(store => {
        if (store.storeId === storeId) {
            const filteredItems = store.items.filter(item => item.productId !== productId);
            console.log('Updated items after removal:', filteredItems);
            return { ...store, items: filteredItems };
        }
        return store;
    });
};

export const increaseProductQuantity = (cartItems, storeId, productId) => {
    console.log('Increasing quantity for product:', productId, 'in store:', storeId);
    return cartItems.map(store => {
        if (store.storeId === storeId) {
            const updatedItems = store.items.map(item => {
                if (item.productId === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            console.log('Updated items after increase:', updatedItems);
            return { ...store, items: updatedItems };
        }
        return store;
    });
};

export const decreaseProductQuantity = (cartItems, storeId, productId) => {
    console.log('Decreasing quantity for product:', productId, 'in store:', storeId);
    return cartItems.map(store => {
        if (store.storeId === storeId) {
            const updatedItems = store.items.map(item => {
                if (item.productId === productId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            console.log('Updated items after decrease:', updatedItems);
            return { ...store, items: updatedItems };
        }
        return store;
    });
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
