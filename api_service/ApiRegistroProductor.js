import React, { useState } from "react";
import { URL } from "../constants/theme";
import { userId, setUserType } from "../informacion/User";

export const registerProductorService = (num_acreditation, name, fav_types) => {

    setUserType("Productor");

    return new Promise ((resolve, reject) => {
        
        const data = {
            num_accreditation: num_acreditation,
            name_productor: name,
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
        
        const url = 'http://'+URL+'/users/register/Productor/'+userId()+'/';
        
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

const ApiRegistroProductor = () => {
  
}

export default ApiRegistroProductor;