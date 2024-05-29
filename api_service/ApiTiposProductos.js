import React, { useState } from "react";
import { URL } from "../constants/theme";

export const typeProducts = () => {
    
    return new Promise ((resolve, reject) => {
        
        const csrfToken = '';
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
                }
        };
        
        const url = 'http://'+URL+'/products/types/';
        
        fetch(url, requestOptions)
            .then(response => {
                
            return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            });
    })
} 

const ApiTiposProductos = () => {
  
}

export default ApiTiposProductos;