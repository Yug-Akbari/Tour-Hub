import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from './config';
import { addUser, getUserByEmail } from './userService';

// Sign in with email and password
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Create new user account
export const createUser = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update the user's display name
        await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`
        });

        // Check if user already exists in users collection
        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            // Add user to users collection
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: 'user',
                joinDate: new Date().toISOString().split('T')[0]
            };

            await addUser(userData);
            console.log('User added to users collection');
        }

        return {
            success: true,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                role: 'user' // Default role for new users
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Sign out user
export const signOutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Listen to authentication state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};