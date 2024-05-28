import React, { useState } from "react";
import { URL } from "../constants/theme";

export const informacionUsuario = (id) => {

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
        
        const url = 'http://'+URL+'/users/profile/'+id;
        
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

export const calculoDistancias = (latitude1, longitude1, latitude2, longitude2) => {

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
        
        const url = 'http://'+URL+'/locations/distance?origin_lat='+latitude1+'&origin_long='+longitude1+'&destination_lat='+latitude2+'&destination_long='+longitude2;

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

export const infoVendedor = (id) => {
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
        
        const url = 'http://'+URL+'/users/users/'+id+'/getSpecificInfo';

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

const ApiMap = () => {
  
}

export default ApiMap;