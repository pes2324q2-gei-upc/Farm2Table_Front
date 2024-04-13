import { useEffect } from 'react';

const SERVER_URL = 'ws://localhost:8000/ws/chat/messages/';

const WebSocket = () => {
    useEffect(() => {
        const socket = new WebSocket(SERVER_URL);

        const user = {
            userId: 123,
            username: 'usuario1'
        };

        socket.onopen = () => {
            console.log('Conexión WebSocket establecida');
            socket.send(JSON.stringify({
                type: 'authentication',
                user: user
            }));
        };

        socket.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
        };

        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        // Limpiar la conexión al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);

    return null;
};

export default WebSocket;
