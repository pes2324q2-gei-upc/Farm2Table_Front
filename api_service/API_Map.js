import React, { useState } from "react";
import { URL } from "../constants/theme";

export const informacionUsuario = (id) => {
    return new Promise((resolve, reject) => {

        const csrfToken = '';

        const requestOptions = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
        };
        const url = 'http://' + URL + '/users/profile/' + id;

        fetch(url, requestOptions)
            .then(response => {
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                console.log(data); // Log the JSON data
                resolve(data); // Resolve the promise with JSON data
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                reject(new Error(error));
            });
    });
};

export const direccionCoordenadas = (address) => {
     console.log("tatata")
     console.log(address)
    return new Promise ((resolve, reject) => {
        const data = {
            address: address,
        };
        console.log(data)
        console.log(JSON.stringify(data))
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
        console.log(url)
        
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

export const informacionMinorista = (id) => {
     console.log("diaiai")
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
    console.log("nanit")
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
    console.log("adios")
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