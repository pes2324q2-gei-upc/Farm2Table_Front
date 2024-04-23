import { useState, useEffect } from 'react';

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