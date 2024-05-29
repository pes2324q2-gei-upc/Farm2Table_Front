import React, { useState } from "react";
import { getPalabra } from "./User";

const IP = "13.37.224.132";
export const url_post_service = "http://nattech.fib.upc.edu:40390/api/v1/adj/chatbot/nuevaPalabra"
export const url_get_service = "http://nattech.fib.upc.edu:40390/api/v1/adj/chatbot/consultaExterna"
export const url_login_service = "http://nattech.fib.upc.edu:40390/api/v1/adj/usuari/login?email=extern@gmail.com&password=3c9201d40e322d208e49058c471454627c956f82e4ec0d73ab3d"

let token = ''

export const getIP = () => {
    return IP;
}

const Constants = () => {
  
}

export const setToken = (value) => {
    token = value
}

export const getToken = () => {
    return token
}

export default Constants;