import React, { useState } from "react";
import { getIP } from "../informacion/Constants";

const API_URL = `http://${getIP()}`;


export const googleSignIn = async (idToken) => {
    try {
        const response = await fetch(`${API_URL}/users/googleLoginRegister/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id_token": idToken})
        });
        const response_json = await response.json();
        if (response.ok) {
            return response_json;
        } else {
            throw new Error(response_json.message);
        }
    } catch (error) {
        console.error("Failed to login with Google: ", error);
        throw error;
    }
}


