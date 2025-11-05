import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from './config';

const DESTINATIONS_COLLECTION = 'destinations';

// Get all destinations
export const getDestinations = async () => {
    try {
        const q = query(collection(db, DESTINATIONS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const destinations = [];
        querySnapshot.forEach((doc) => {
            destinations.push({ id: doc.id, ...doc.data() });
        });
        return destinations;
    } catch (error) {
        console.error('Error getting destinations:', error);
        throw error;
    }
};

// Add a new destination
export const addDestination = async (destinationData) => {
    try {
        const docRef = await addDoc(collection(db, DESTINATIONS_COLLECTION), {
            ...destinationData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return { id: docRef.id, ...destinationData };
    } catch (error) {
        console.error('Error adding destination:', error);
        throw error;
    }
};

// Update a destination
export const updateDestination = async (destinationId, updateData) => {
    try {
        const destinationRef = doc(db, DESTINATIONS_COLLECTION, destinationId);
        await updateDoc(destinationRef, {
            ...updateData,
            updatedAt: new Date()
        });
        return { id: destinationId, ...updateData };
    } catch (error) {
        console.error('Error updating destination:', error);
        throw error;
    }
};

// Delete a destination
export const deleteDestination = async (destinationId) => {
    try {
        await deleteDoc(doc(db, DESTINATIONS_COLLECTION, destinationId));
        return destinationId;
    } catch (error) {
        console.error('Error deleting destination:', error);
        throw error;
    }
};
