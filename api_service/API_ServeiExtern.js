import {userId} from '../informacion/User'
import {url_get_service,url_post_service,url_login_service} from '../informacion/Constants'


export const createWord = async (list,token) => {
    const user_id = userId()
    for (const element of list) {
        let keys = element.keys.split(','); 
        let keys_to_sent = []
        for (let i = 0; i < keys.length; ++i) {
            keys_to_sent.push(keys[i] + `_${user_id}`)
        }
        
        console.log("keys: " + keys)
        const phrase = element.phrase;
        console.log("frase: " + phrase)
        console.log("token que se envia: "+token)
        const new_keys = keys_to_sent
        try {
            console.log("entro dentro")
            const response = await fetch(url_post_service, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify({
                    "frase": phrase,
                    "keywords": new_keys
                }),
            });
            if (!response.ok) {
                throw new Error('Error adding keys and phrase');
                
            }
            else {
                console.log("voy pal else")
            }
            console.log(response)
            const data = await response.text();
            console.log(data)
            return data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export const getMatchPhrase = async (phrase,token,id_user) => {
    console.log("entro buscar frase")
    console.log("frase que le entra: " + phrase)
    const user_id = userId()
    phrase = phrase.split(" ")
    let frase = ""
    for (let i = 0; i < phrase.length; ++i) {
        frase += phrase[i] + `_${id_user} `
    }
    frase = frase.slice(0, -1)
    console.log("frase final: " + frase)
    console.log("token que se envia: " + token)
    console.log(url_get_service + `?mensaje=${frase}`)
    try {
        const url = url_get_service + `?mensaje=${frase}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
        });
         if (!response.ok) {
            throw new Error('No se encontró ninguna frase');
         }
        const data = await response.text();
        return data;
    }
    catch (error) {
        console.error('Error sending phrase:', error);
        throw error;
    }
}


export const loginInService = async () => {
    try {
        const url = url_login_service
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (error) {
        console.error('Error login:', error);
        throw error;
    }
}