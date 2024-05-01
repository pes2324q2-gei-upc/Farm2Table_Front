import React, { useState } from "react";
import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";

export const registerProductorService = (num_acreditation, name, fav_types) => {

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
        
        console.log(requestOptions)
        const url = 'http://'+getIP()+'/users/register/Productor/'+userId()+'/';
        
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
            reject(new Error(error));
            });
    })
    
} 

const ApiRegistroProductor = () => {
  
}

export default ApiRegistroProductor;