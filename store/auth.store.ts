import { create } from 'zustand'
import { User } from '@/type';
import { getCurrentUser } from '@/lib/appwrite';

type AuthState = {
    isAuthenticated: boolean;
    user : User | null;
    isLoading: boolean;

    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;

    fetachAuthenitcatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated:value  }),
    setUser: (user) => set({ user }),
    setIsLoading: (value) => set({ isLoading: value }),
    fetachAuthenitcatedUser: async () => {
        set({ isLoading: true });
        try {
            const user = await getCurrentUser();
            
            if (user) {
                set({isAuthenticated: true , user:user as User });
            } else {
                set({ user: null, isAuthenticated: false });
            }


        } catch (error) {
            console.error('Error fetching authenticated user:', error);
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    }
}))


export default useAuthStore;