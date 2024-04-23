/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author         Version         Remarks
------------------------------------------------------------------------------------------
29/11/2023            BooKJ          1.0.0           base version  
09/01/2024            BooKJ          1.0.1           add in condition only allow user set key tat include in storage key
*/

import localForage from "localforage";

import { storageKeys } from "./genConfigs";

export const localForageWrapper = {

  getItem: async (key) => {
    try {
      const value = await localForage.getItem(key);
      return value; // This will return the value directly
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      if (storageKeys.includes(key)) {
        await localForage.setItem(key, value);
      } else {
        console.error("Error setting item: Key is not allowed.");
      }
    } catch (error) {
      console.error("Error setting item:", error);
    }
  },
  removeItem: async (key) => {
    try {
      await localForage.removeItem(key);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
  clear: async () => {
    try {
      await localForage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
