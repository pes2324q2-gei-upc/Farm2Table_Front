import { useState, useEffect } from 'react';
import { getIP } from "../informacion/Constants";

const API_ENDPOINT = "http://"+URL+"/users/productor/";

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.data;
    } catch (error) {
        throw error;
    }
};

export { fetchData, API_ENDPOINT };

const API_URL = `http://${getIP()}`;

export const fetchUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/profile/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        throw error;
    }
}

export const fetchProducts = async (userId) => {
    try {
        console.log(userId);
        console.log(`${API_URL}/users/productor/${userId}/products`);
        const response = await fetch(`${API_URL}/users/productor/${userId}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        throw error;
    }
}
