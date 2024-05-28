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

export const fetchAddFunds = async(userId, amount) => {
    try {
        const response = await fetch(`${API_URL}/users/funds/${userId}/add`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"money": amount}),
        });
        const data = await response.json();
        if (response.ok) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to add funds: ", error);
        throw error;
    }
}


