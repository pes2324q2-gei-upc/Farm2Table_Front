const url_get = "nattech.fib.upc.edu:40390/api/v1/adj/chatbot/consultaExterna"
const url_post = "nattech.fib.upc.edu:40390/api/v1/adj/chatbot/nuevaPalabra"




export const createWord = async (list) => {
    for (const element of list) {
        const keys = element.keys;
        const phrase = element.phrase;
        try {
            const response = await fetch(url_post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "frase": phrase,
                    "keys": keys
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error adding keys plus phrase:', error);
            throw error;
        }
    }
};

export const getMatchPhrase = async (phrase) => {
    try {
        const response = await fetch(url_post + `?mensaje=${phrase}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
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