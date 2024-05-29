import React, { useState } from "react";
import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";


const API_URL = `http://${getIP()}`;


export const getFavourites = async (userId, favType, userType) => {
    try {
        console.log("Fetching favourites");
        console.log(`${API_URL}/users/${userType}/favourite/${favType}/${userId}`)
        const url = `${API_URL}/users/${userType}/favourite/${favType}/${userId}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const addFavourite = async (userId, favType, userType, favId) => {
    try {

        let bodyJson = {};

        if (favType === "products") {
            bodyJson = { product_id: favId };
        } else if (favType === "minoristas") {
            bodyJson = { minorista_id: favId };
        } else if (favType === "productors") {
            bodyJson = { productor_id: favId };
        } else if (favType === "types") {
            bodyJson = { type_id: favId };
        }

        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyJson),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
};


export const removeFavourite = async (userId, favType, userType, favId) => {
    try {
        let bodyJson = [];

        if (favType === "products") {
            bodyJson = [{ product_id: favId }];
        } else if (favType === "minoristas") {
            bodyJson = [{ minorista_id: favId }];
        } else if (favType === "productors") {
            bodyJson = [{ productor_id: favId }];
        } else if (favType === "types") {
            bodyJson = [{ type_id: favId }];
        } else {
            throw new Error(`Unknown favType: ${favType}`);
        }

        console.log("Removing favourite", JSON.stringify(bodyJson));
        console.log(`${API_URL}/users/${userType}/favourite/${favType}/${userId}/remove`);
        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json',
            },
            body: JSON.stringify(bodyJson),
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

export const isUserFavourite = async (userId, favType, userType, favId) => {
    try {
        console.log("Checking if user is favourite");
        console.log(`${API_URL}/users/${userType}/favourite/${favType}/${userId}`);
        const response = await fetch(`${API_URL}/users/${userType}/favourite/${favType}/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}