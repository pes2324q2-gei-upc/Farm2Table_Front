import { URL } from '../constants/theme';

export const fetchProductTypes = async () => {
    try {
        const response = await fetch(`http://${URL}/products/types/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(item => ({ key: item.id.toString(), value: item.name }));
    } catch (error) {
        console.error('Error fetching product types:', error);
        throw error;
    }
};


export const addNewProduct = async (formData) => {
    try {
        const response = await fetch(`http://${URL}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to add the product');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
