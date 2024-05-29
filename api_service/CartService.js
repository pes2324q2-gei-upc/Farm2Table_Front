import { addProductToCart, loadCart, saveCart } from '../informacion/cartInfo';
import { userId } from '../informacion/User';

async function addToCart(productId, productName, productPrice, quantity, productorId, productorName, productorAvatar) {
    // Load the cart
    let cart = [];
    if (!loadCart(userId())) {
        cart = await saveCart(userId(), []);
    }
    else cart = await loadCart(userId());

    const product = {
        productId: productId,
        name: productName,
        price: productPrice,
        quantity: quantity
    };

    console.log('Adding product to cart:', product, 'in store:', productorId);

    // Add the product to the cart
    const updatedcart = addProductToCart(cart, productorId, product, productorName, productorAvatar);

    // Save the updated cart
    await saveCart(userId(), updatedcart);
}

export default addToCart;