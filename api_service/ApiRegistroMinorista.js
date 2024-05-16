import React, { useState } from "react";
import { URL } from "../constants/theme";
import { userId } from "../informacion/User";

export const registerMinoristaService = (tipus, servei, fav_types) => {

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

        console.log("DATOS:",requestOptions)
        
        const url = 'http://'+URL+'/users/register/Minorista/'+userId()+'/';
        console.log("URL:",url)
        
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

const ApiRegistroMinorista = () => {
  
}

export default ApiRegistroMinorista;