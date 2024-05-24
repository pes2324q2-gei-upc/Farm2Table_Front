import React, { useState } from "react";
import { URL } from "../constants/theme";
import { userId } from "../informacion/User";

export const informacionUsuario = () => {

    return new Promise ((resolve, reject) => {
        
        const csrfToken = '';
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
              },
        };
        
        const url = 'http://'+URL+'/users/profile/'+userId();
        
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

export const direccionCoordenadas = (addres) => {

    return new Promise ((resolve, reject) => {
        const data = {
            address: addres,
        };

        const csrfToken = '';
        
        const requestOptions = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
              },
              body: JSON.stringify(data)
        };
        
        const url = 'http://'+URL+'/locations/address/coordinates';
        
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

export const informacionMinorista = (id) => {

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
        
        const url = 'http://'+URL+'/locations/'+id;
        
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

export const vendedoresEnRango = (type, reach, latitude, longitude) => {

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
        
        const url = 'http://'+URL+'/locations/'+type+'/range?range='+reach+'&latitude='+latitude+'&longitude='+longitude;
        console.log(url);

        fetch(url, requestOptions)
            .then(response => {
              
            return response.json();
            })
            .then(data => {
                console.log("DATAZO =", data)
            resolve(data);
    
            })
            .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            reject(new Error(error));
            });
    })
    
}

const ApiMap = () => {
  
}

export default ApiMap;