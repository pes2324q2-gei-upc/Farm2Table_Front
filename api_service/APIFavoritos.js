import React, { useState } from "react";
import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";


const API_URL = `http://${getIP()}`;


export const getFavourites = async (userId, favType, userType) => {
    try {
        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
};

export const addFavourite = async (userId, favType, userType, favId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favId }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
};

export const removeFavourite = async (userId, favType, userType, favId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favId }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}