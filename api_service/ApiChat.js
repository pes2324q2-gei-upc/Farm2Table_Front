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