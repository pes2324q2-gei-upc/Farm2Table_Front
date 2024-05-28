import React, { useState } from "react";
import { getIP } from "../informacion/Constants";


const API_URL = `http://${getIP()}`;


export const fetchProductInfo = async(productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch product info: ", error);
        throw error;
    }
}

export const putProductInfo = async(productId, productData) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
            },
            body: productData,
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to update product info: ", error);
        throw error;
    }
}

export const deleteProduct = async(productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to delete product: ", error);
        throw error;
    }
}