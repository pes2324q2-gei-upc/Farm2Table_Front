import React, { useState } from "react";
import { getIP } from "../informacion/Constants";


const API_URL = `http://${getIP()}`;


export const fetchUserFunds = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/users/funds/${userId}`);
        const data = await response.json();
        if (response.ok) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user funds: ", error);
        throw error;
    }
}

export const fetchProductStock = async(productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch product stock: ", error);
        throw error;
    }
}

export const buyProduct = async (productId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}/buy?quantity=${quantity}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to buy product');
        }
    } catch (error) {
        console.error("Failed to buy product: ", error);
        throw error;
    }
}

export const processPurchase = async (data) => {
    try {
        const response = await fetch(`${API_URL}/users/pay/cart`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': 'x5M868wXkmLxsCWEiBKaY2U5XRQpZOVrzbHCKpjrvcRDyrJsRxUdSGsaIsbHzLU5'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch (error) {
        console.error("Failed to process purchase: ", error);
        throw error;
    }
}
