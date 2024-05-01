import React, { useState } from "react";
import esp from "../translations/esp.json"
import eng from "../translations/engl.json"
import cat from "../translations/cat.json"

id = null;
user_type = null;
correo = null;
idioma = "esp";
export const TIPUS_IDIOMA = ["Español", "Català", "English"];

export const setUserId = (idd) => {
    id = idd;
    console.log("Id:", id);
} 

export const userId = () => {
    console.log("Id:", id);
    return id;
}

export const setUserType = (type) => {
    user_type = type;
}

export const userType = () => {
    return user_type;
}

export const setEmail = (email) => {
    correo = email;
}

export const email = () => {
    return correo;
}

export const setIdioma = (idioma) => {
    console.log("Idioma", idioma)
    switch (idioma) {
        case "Español":
            this.idioma = "esp"; break;
        case "Català":
            this.idioma = "cat"; break;
        case "English":
            this.idioma = "eng"; break;
        default:
            this.idioma = idioma;
    }
    console.log("Idioma por tanto", this.idioma)
}

export const getIdioma = () => {
    switch (idioma) {
        case "esp":
            return "Español";
        case "cat":
            return "Català";
        case "eng":
            return "English";
        default:
            return idioma;
    }
}

export const getPalabra = (palabra) => {
    switch (idioma) {
        case "esp":
            return esp[palabra] || palabra;
        case "eng":
            return eng[palabra] || palabra;
        case "cat":
            return cat[palabra] || palabra;
        default:
            return palabra;
    }
}

export const getPalabraEng = (palabra) => {
    return eng[palabra] || palabra;
}

export const getRestaurantOrMercat = (palabra) => {
    switch (idioma) {
        case "esp":
            if (palabra == "Restaurante") return "Restaurant";
            else if (palabra == "Mercado") return "Mercat";
            return palabra;
        case  "eng":
            if (palabra == "Market") return "Mercat";
            return palabra;
        case "cat":
            return palabra;
        default:
            return palabra;
    }
}

const User = () => {
  
}

export default User;