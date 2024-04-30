import React, { useState } from "react";
import { getIP } from "../informacion/Constants";


const API_URL = `http://${getIP()}`;


export const fetchUserFunds = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/users/funds/${userId}`);
        const data = await response.json();
        if (response.ok) {
            console.log(data.data);
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