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
        //const response = await fetch(`${API_URL}/users/users/${userId}/getSpecificInfo`);
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

export const fetchSpecificInfo = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/users/${userId}/getSpecificInfo`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        throw error;
    }
}

const Get_API_Medals = 'http://'+getIP()+'/gamification/medal';
const Get_API_Counter_Medals = 'http://'+getIP()+'/gamification/counter/';
const Get_API_Medals_ID = 'http://'+getIP()+'/gamification/medal/';

export const fetchMedals = async () => {
    try {
        const response = await fetch(Get_API_Medals);
        if (!response.ok) {
            throw new Error('Failed to fetch Medals');
        }
        const json = await response.json();
        //console.log(json);
        return json;
    } catch (error) {
        throw error;
    }
}

export const fetchCounterMedals = async (id) => {
    try {
        const response = await fetch(Get_API_Counter_Medals+id);
        if (!response.ok) {
            throw new Error('Failed to fetch Counter');
        }
        const json = await response.json();
        //console.log(json);
        return json;
    } catch (error) {
        throw error;
    }
}

export const fetchUserMedals = async (userId) => {
    try {
        const response = await fetch(Get_API_Medals_ID+userId);
        //console.log(Get_API_Medals_ID+userId);
        if (!response.ok) {
            throw new Error('Failed to fetch User Medasl');
        }
        const json = await response.json();
        //console.log(json);
        return json;
    } catch (error) {
        throw error;
    }
}