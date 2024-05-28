import { getIP } from "../informacion/Constants";

const API_URL = getIP();
const API_ENDPOINT = "http://"+API_URL+"/users/minorista/";
export const fetchUserComments = async(userId, setValue) => {
    try {
        const response = await fetch(API_ENDPOINT+userId+"/comments");
        const data = await response.json();
        if (response.ok) {
            //console.log(data.data);
            return(data.data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user orders: ", error);
        throw error;
    }
};
