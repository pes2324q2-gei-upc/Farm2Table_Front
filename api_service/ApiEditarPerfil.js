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
        item.avatar = data.data.avatar;
        console.log(item.avatar);
        if (!response.ok) {
            console.log('Product added successfully:', data);
            throw new Error('Something went wrong');
        }else{
            console.log('Product added successfully:', data);
            Alert.alert('Success', 'Profile changed successfully');
            console.log("pausa");
        }
        }catch (error) {
            console.log("hola");
            Alert.alert('Error', 'An error occurred while adding the product');
            console.log(error.message);
        }
}