import React, { useState } from "react";
import { URL } from "../constants/theme";

export const registerService = (username, password, confirm_password) => {
    
    return new Promise ((resolve, reject) => {
        const data = {
            email: username,
            password: password,
            repeat_password: confirm_password,
        };
        
        const csrfToken = '';
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
                },
            body: JSON.stringify(data)
        };
        
        const url = 'http://'+URL+'/users/register/';
        
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

const ApiRegistro = () => {
  
}

export default ApiRegistro;