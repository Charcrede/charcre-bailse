import { auth } from '@/lib/firebase';
import {
    signOut,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const authService = {
    login: async () => {
        // Connexion avec Google
        return await signInWithPopup(auth, googleProvider);
    },

    logout: async () => {
        return await signOut(auth);
    },

    onUserChanged: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, callback);
    }
};
