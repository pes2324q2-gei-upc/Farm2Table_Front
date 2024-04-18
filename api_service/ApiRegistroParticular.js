import React, { useState } from "react";
import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";

export const registerParticularService = (abast, productes) => {

    return new Promise ((resolve, reject) => {
        
        const data = {
            reach: abast,
            products: productes,
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
        
        const url = 'http://'+getIP()+'/users/register/Consumer/'+userId()+'/';

        fetch(url, requestOptions)
            .then(response => {
              
            return response.json();
            })
            .then(data => {
              
            console.log(data);
            resolve(data);
    
            })
            .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            });
    })
    
} 

const ApiRegistroParticular = () => {
  
}

export default ApiRegistroParticular;