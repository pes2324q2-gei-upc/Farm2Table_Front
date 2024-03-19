import React, { useState } from "react";

id = null;
user_type = null;
correo = null;

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

const User = () => {
  
}

export default User;