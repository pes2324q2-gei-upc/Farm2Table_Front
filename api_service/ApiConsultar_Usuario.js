import { useState, useEffect } from 'react';
import { getIP } from "../informacion/Constants";

const API_ENDPOINT = "http://"+URL+"/users/productor/";

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data ' +  response);
        }
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

const API_COMMENTS = "http://"+getIP()+"/users/";
export const fetchProductorComments = async(userId, tipus) => {
    //console.log("api comentarios:" +API_COMMENTS+tipus+"/"+userId+"/comments");
    try {
        const response = await fetch(API_COMMENTS+tipus+"/"+userId+"/comments");
        const data = await response.json();
        if (response.ok) {
            return(data.data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user orders: ", error);
        throw error;
    }
};
