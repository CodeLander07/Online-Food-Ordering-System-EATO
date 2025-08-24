import { create } from 'zustand'
import { User } from '@/type';
import { getCurrentUser } from '@/lib/appwrite';

type AuthState = {
    isAuthenticated: boolean;
    user : User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated : false,
    user:null,
    isLoading: false,

    setIsAuthenticated :(value) => set({isAuthenticated:value}),
    setUser :(user) => set({user}),
    setLoading:(value) => set({isLoading:value}),

    fetchAuthenticatedUser: async() =>{
        set({isLoading :true});

        try{
            const user = await getCurrentUser();
            if(user) set({ user: user as User, isAuthenticated: true });
            else set({ user: null, isAuthenticated: false });
        }
        catch(e){
            console.error('Error fetching authenticated user:', e);
            set({ user: null, isAuthenticated: false });
        }
        finally{
            set({isLoading:false});
        }
    }
}))


export default useAuthStore;