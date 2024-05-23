import { useState, useEffect } from 'react';
import { getIP } from "../informacion/Constants";

const API_ENDPOINT = "http://"+URL+"/users/productor/";

const fetchData = async (url) => {
    try {
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data xd' +  response);
        }
        console.log("bien");
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
    console.log("api comentarios:" +API_COMMENTS+tipus+"/"+userId+"/comments");
    try {
        console.log("llega a consultar");
        console.log(API_COMMENTS+userId+"/comments");
        const response = await fetch(API_COMMENTS+tipus+"/"+userId+"/comments");
        console.log(API_COMMENTS);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            console.log(data.data);
            return(data.data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user orders: ", error);
        throw error;
    }
};
