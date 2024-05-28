import { URL } from "../constants/theme";
import { Alert } from 'react-native'

export const submitPerfil = async (formData, id) => {
    try {
        const response = await fetch(`http://${URL}/users/profile/`+id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Something went wrong');
        }else{
            Alert.alert('Success', 'Profile changed successfully');
        }
        }catch (error) {
            Alert.alert('Error', 'An error occurred while adding the product');
            console.log(error.message);
        }
}