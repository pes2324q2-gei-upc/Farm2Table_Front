import React, { useState } from "react";
import { getPalabra } from "./User";

const IP = "13.37.224.132";
const TIPUS_PRODUCTES = [getPalabra("apples"),getPalabra("bananas")];

export const getIP = () => {
    return IP;
}

const Constants = () => {
  
}

export const getTipusProductes = () => {
    return TIPUS_PRODUCTES;
}

export default Constants;