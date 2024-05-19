import { URL } from '../constants/theme';

export const fetchChats = async (userId) => {
    try {
        const response = await fetch(`http://${URL}/chats/${userId}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch chats:', error);
        throw error; // Re-throw to handle it in the component
    }
};

export const deleteChat = async (chatId) => {
    try {
        const response = await fetch(`http://${URL}/chats/deleteChat/${chatId}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to delete chat:', error);
        throw error; // Re-throw to handle it in the component
    }
};
