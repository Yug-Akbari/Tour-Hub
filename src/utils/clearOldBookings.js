// Utility to clear old bookings with numeric IDs from localStorage
// This helps ensure we start fresh with Firebase-generated string IDs

export const clearOldBookings = () => {
    try {
        // Clear old bookings from localStorage
        localStorage.removeItem('bookings');
        console.log('Old bookings cleared from localStorage');

        // Optionally clear all localStorage data
        // localStorage.clear();

        return true;
    } catch (error) {
        console.error('Error clearing old bookings:', error);
        return false;
    }
};

// Auto-clear on import (for development)
if (process.env.NODE_ENV === 'development') {
    clearOldBookings();
}
