import {userId} from '../informacion/User'
import {url_get_service,url_post_service,url_login_service} from '../informacion/Constants'


export const createWord = async (list,token) => {
    const user_id = userId()
    console.log(user_id)
    console.log(list)
    for (const element of list) {
        let keys = element.keys.split(','); 
        for (let i = 0; i < keys.length; ++i) {
            keys[i] = keys[i] + `_${user_id}`
        }
        
        console.log("keys: " + keys)
        const phrase = element.phrase;
        console.log("frase: " + phrase)
        
        try {
            const response = await fetch(url_post_service, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify({
                    "frase": phrase,
                    "keywords": keys
                }),
            });
            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
                
            }
            const data = await response.json();
            console.log(data)
            return data;
        }
        catch (error) {
            console.log('Error adding keys plus phrase:', error);
            throw error;
        }
    }
};

export const getMatchPhrase = async (phrase) => {
    const user_id = userId()
    for (let i = 0; i < phrase.length(); ++i) {
        phrase[i] = phrase[i] + `_${user_id}`
    }
    console.log(phrase)
    try {
        const url = url_get_service + `?mensaje=${phrase}`
        console.log(url)
        const token = getToken()
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
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


export const loginInService = async () => {
    try {
        const url = url_login_service
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
        console.error('Error login:', error);
        throw error;
    }
}

