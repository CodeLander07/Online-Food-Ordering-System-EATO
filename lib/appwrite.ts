
import { CreateUserPrams, SignInParams } from "@/type";
import { Platform } from "react-native";
import { Client, Account , Databases , Avatars, ID , Query} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT !,
    Platform:"com.codelander.eato",
    project:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:'687a283400010ff0f3b7',
    userCollectionId:'687a28a40008e269bf7e'
}

export const client = new Client();

client 
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.project!)
    .setPlatform(appwriteConfig.Platform) ;   

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({name,email,password}: CreateUserPrams) => {
   try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({email,password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if(!session) throw new Error("Failed to create session");
        return session;
    }
    catch(e){
        throw new Error(`Error signing in: ${e}`);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}