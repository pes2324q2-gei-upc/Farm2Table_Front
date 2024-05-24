import React, { useState } from "react";
import { URL } from "../constants/theme";
import { userId } from "../informacion/User";
import { setUserType } from "../informacion/User";

export const registerMinoristaService = (tipus, servei, fav_types) => {
    
    setUserType("Minorista");

    return new Promise ((resolve, reject) => {
        
        const data = {
            service: tipus,
            service_name: servei,
            types: fav_types
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
        
        const url = 'http://'+URL+'/users/register/Minorista/'+userId()+'/';
        
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

const ApiRegistroMinorista = () => {
  
}

export default ApiRegistroMinorista;