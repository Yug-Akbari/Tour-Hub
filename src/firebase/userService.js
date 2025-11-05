import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from './config';

const USERS_COLLECTION = 'users';

// Get all users
export const getUsers = async () => {
    try {
        console.log('Firebase: Attempting to get users from collection:', USERS_COLLECTION);
        const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const users = [];

        console.log('Firebase: Query snapshot size:', querySnapshot.size);

        querySnapshot.forEach((doc) => {
            const userData = { id: doc.id, ...doc.data() };
            console.log('Firebase: Found user:', userData);
            users.push(userData);
        });

        console.log('Firebase: Total users found:', users.length);
        return users;
    } catch (error) {
        console.error('Firebase: Error getting users:', error);
        console.error('Firebase: Error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        // Return empty array if no users exist yet
        return [];
    }
};

// Get user by email
export const getUserByEmail = async (email) => {
    try {
        const q = query(collection(db, USERS_COLLECTION), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting user by email:', error);
        return null;
    }
};

// Add a new user
export const addUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, USERS_COLLECTION), {
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return { id: docRef.id, ...userData };
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

// Update a user
export const updateUser = async (userId, updateData) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        await updateDoc(userRef, {
            ...updateData,
            updatedAt: new Date()
        });
        return { id: userId, ...updateData };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (userId) => {
    try {
        await deleteDoc(doc(db, USERS_COLLECTION, userId));
        return userId;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Sync Firebase Auth users with users collection
export const syncAuthUsers = async () => {
    try {
        // This function would typically be called when a user registers
        // For now, we'll create a default admin user if none exists
        const existingUsers = await getUsers();

        if (existingUsers.length === 0) {
            // Create default admin user
            const adminUser = {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@touristhub.com',
                role: 'admin',
                joinDate: new Date().toISOString().split('T')[0]
            };

            await addUser(adminUser);
            console.log('Default admin user created');
        }

        return existingUsers;
    } catch (error) {
        console.error('Error syncing auth users:', error);
        return [];
    }
};