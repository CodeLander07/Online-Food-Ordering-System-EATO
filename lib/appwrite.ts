import { Platform } from "react-native";

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ,
    Platform:"com.codelander.eato",
    project:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId:'687a283400010ff0f3b7',
    userCollectionId:'687a28a40008e269bf7e'
}