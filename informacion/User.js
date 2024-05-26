import React, { useState } from "react";
import { Image } from "react-native";
import esp from "../translations/esp.json"
import eng from "../translations/engl.json"
import cat from "../translations/cat.json"
import banderaCat from '../assets/Cataluña.png'
import banderaEsp from '../assets/España.png'
import banderaIng from '../assets/Inglaterra.png'
import STYLES from '../styles/inici_registre.style'

id = null;
user_type = null;
correo = null;
idioma = "esp";
export const TIPUS_IDIOMA = ["Español", "Català", "English"];

const imagenesPorIdioma = {
    esp: banderaEsp,
    cat: banderaCat,
    eng: banderaIng,
};

export const setUserId = (idd) => {
    id = idd;
} 

export const userId = () => {
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

export const renderFlagImage = () => {
    return imagenesPorIdioma[idioma] || null;
};

export const renderEspaña = () => {
    return imagenesPorIdioma["esp"];
};

export const renderCataluña = () => {
    return imagenesPorIdioma["cat"];
};

export const renderInglaterra = () => {
    return imagenesPorIdioma["eng"];
};

export const logout = () => {
    id = null;
    user_type = null;
    correo = null;
}

const User = () => {
  
}

export default User;