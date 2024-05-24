import {userId} from '../informacion/User'

const url_get = "http://nattech.fib.upc.edu:40390/api/v1/adj/chatbot/consultaExterna"
const url_post = "http://nattech.fib.upc.edu:40390/api/v1/adj/chatbot/nuevaPalabra"
const prueba = "http://nattech.fib.upc.edu:40390/api/v1/adj/chatbot/consultaExterna?mensaje=hola"




export const createWord = async (list) => {
    const user_id = userId()
    console.log(user_id)
    console.log(list)
    for (const element of list) {
        let keys = element.keys.split(','); 
        for (let i = 0; i < keys.length; ++i) {
            keys[i] = keys[i] + `_${user_id}`
        }
        
        console.log("keys: " + keys)
        const phrase = element.phrase + `_${user_id}`;
        console.log("frase: " + phrase)
        
        try {
            const response = await fetch(url_post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "frase": phrase,
                    "keywords": keys
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log('Error adding keys plus phrase:', error);
            throw error;
        }
    }
};

export const getMatchPhrase = async (phrase) => {
    console.log(phrase)
    try {
        const url = url_get + `?mensaje=${phrase}`
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.ok)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error sending phrase:', error);
        throw error;
    }
}