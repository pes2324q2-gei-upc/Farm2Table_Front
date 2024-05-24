import React, { useState } from "react";
import { URL } from "../constants/theme";
import { userId, setUserType } from "../informacion/User";

export const registerParticularService = (addres, productes) => {

    setUserType("Particular");

    return new Promise ((resolve, reject) => {
        
        const data = {
            address: addres,
            types: productes
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
        
        const url = 'http://'+URL+'/users/register/Consumer/'+userId()+'/';

        fetch(url, requestOptions)
            .then(response => {
              
            return response.json();
            })
            .then(data => {
            resolve(data);
    
            })
            .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            reject(new Error(error));
            });
    })
    
} 

const ApiRegistroParticular = () => {
  
}

export default ApiRegistroParticular;