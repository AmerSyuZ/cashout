/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

export interface styles {
  [key: string]: string | number | styles;
}

export const storageKeys = [
  "secret_receipt",
  "_currentMP",
  "sessionData",
  "_mpProfiles",
  "_agentGrp",
  "auth"
];