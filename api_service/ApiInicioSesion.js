import React, { useState } from "react";
import { URL } from "../constants/theme";

export const loginService = (username, password) => {

    return new Promise ((resolve, reject) => {
        const data = {
            email: username,
            password: password,
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
        
        const url = 'http://'+URL+'/users/login/';
        
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

const ApiInicioSesion = () => {
  
}

export default ApiInicioSesion;