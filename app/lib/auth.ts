import * as SecureStore from "expo-secure-store";


 export const  tokenCache = {
  async hetToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
        try{
             return SecureStore.setItemAsync(key, value);
        } catch (err){
            return;
        }
     
    },
  };
