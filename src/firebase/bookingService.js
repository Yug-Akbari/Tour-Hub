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

const BOOKINGS_COLLECTION = 'bookings';

// Add a new booking
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...bookingData };
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

// Get all bookings
export const getBookings = async () => {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    // Return empty array if no bookings exist yet
    return [];
  }
};

// Update a booking
export const updateBooking = async (bookingId, updateData) => {
  try {
    console.log('Updating booking:', bookingId, updateData);
    
    // Ensure bookingId is a string
    const id = String(bookingId);
    console.log('Booking ID type:', typeof id, 'Value:', id);
    
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Booking updated successfully');
    return { id: id, ...updateData };
  } catch (error) {
    console.error('Error updating booking:', error);
    console.error('Error details:', error.message, error.code);
    throw new Error(`Failed to update booking: ${error.message}`);
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    console.log('Deleting booking:', bookingId);
    
    // Ensure bookingId is a string
    const id = String(bookingId);
    console.log('Booking ID type:', typeof id, 'Value:', id);
    
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await deleteDoc(bookingRef);
    console.log('Booking deleted successfully');
    return id;
  } catch (error) {
    console.error('Error deleting booking:', error);
    console.error('Error details:', error.message, error.code);
    throw new Error(`Failed to delete booking: ${error.message}`);
  }
};