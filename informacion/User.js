import React, { useState } from "react";
import esp from "../translations/esp.json"
import eng from "../translations/engl.json"
import cat from "../translations/cat.json"

id = null;
user_type = null;
correo = null;
idioma = "esp";

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
    this.idioma = idioma;
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

const User = () => {
  
}

export default User;