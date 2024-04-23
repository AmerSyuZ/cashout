/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
20/3/2024                         1.0.0           - Base version
*/

import CryptoJS from "crypto-js";

export const encrypt = (value: string, secretKey: string) => {
    return CryptoJS.AES.encrypt(value, secretKey).toString();
};

export const decrypt = (value: string, secretKey: string) => {
    return CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8);
};