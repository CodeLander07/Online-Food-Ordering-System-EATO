import { Platform } from "react-native";

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ,
    Platform:"com.codelander.eato",
    project:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}