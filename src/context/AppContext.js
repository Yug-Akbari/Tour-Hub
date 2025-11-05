import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { addBooking, getBookings, updateBooking, deleteBooking } from '../firebase/bookingService';
import { signInUser, createUser, signOutUser, onAuthStateChange } from '../firebase/authService';
import { getUsers, syncAuthUsers } from '../firebase/userService';
import { getDestinations } from '../firebase/destinationService';
import { clearOldBookings } from '../utils/clearOldBookings';

// Initial state
const initialState = {
    user: null,
    bookings: [],
    tours: [
        {
            id: 1,
            name: 'Adventure Explorer',
            price: 899,
            duration: '7 Days',
            maxGuests: 12,
            description: '7-day adventure tour through mountains and forests',
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
            destinations: ['Mountain Peaks', 'Forest Trails', 'Adventure Sports'],
            rating: 4.8,
            reviews: 2340
        },
        {
            id: 2,
            name: 'Cultural Heritage',
            price: 649,
            duration: '5 Days',
            maxGuests: 15,
            description: '5-day cultural immersion in historic cities',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            destinations: ['Historic Cities', 'Museums', 'Cultural Sites'],
            rating: 4.7,
            reviews: 1890
        },
        {
            id: 3,
            name: 'Beach Paradise',
            price: 399,
            duration: '3 Days',
            maxGuests: 20,
            description: '3-day beach relaxation and water activities',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            destinations: ['Tropical Beaches', 'Water Sports', 'Island Hopping'],
            rating: 4.9,
            reviews: 3120
        }
    ],
    destinations: [
        {
            id: 1,
            name: 'Mountain Peaks',
            description: 'Experience breathtaking mountain views and hiking trails',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            rating: 4.8,
            reviews: 2340
        },
        {
            id: 2,
            name: 'Tropical Beaches',
            description: 'Relax on pristine beaches with crystal clear waters',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            rating: 4.9,
            reviews: 1890
        },
        {
            id: 3,
            name: 'Historic Cities',
            description: 'Discover rich history and cultural heritage',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
            rating: 4.7,
            reviews: 3120
        }
    ],
    users: [
        {
            id: 1,
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@touristhub.com',
            password: 'admin123',
            role: 'admin',
            joinDate: new Date().toISOString().split('T')[0]
        }
    ],
    settings: {
        siteName: 'TouristHub',
        siteEmail: 'info@touristhub.com',
        sitePhone: '+1 (555) 123-4567',
        maxGuests: 20,
        advanceBooking: 30
    },
    message: null
};

// Action types
export const ActionTypes = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_ERROR: 'REGISTER_ERROR',
    ADD_BOOKING: 'ADD_BOOKING',
    UPDATE_BOOKING: 'UPDATE_BOOKING',
    DELETE_BOOKING: 'DELETE_BOOKING',
    ADD_TOUR: 'ADD_TOUR',
    UPDATE_TOUR: 'UPDATE_TOUR',
    DELETE_TOUR: 'DELETE_TOUR',
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    ADD_DESTINATION: 'ADD_DESTINATION',
    UPDATE_DESTINATION: 'UPDATE_DESTINATION',
    DELETE_DESTINATION: 'DELETE_DESTINATION',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    SET_MESSAGE: 'SET_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    LOAD_DATA: 'LOAD_DATA'
};

// Reducer
const appReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload };

        case ActionTypes.LOGOUT:
            return { ...state, user: null };

        case ActionTypes.LOGIN_START:
            return { ...state, loading: true, error: null };

        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case ActionTypes.LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload };

        case ActionTypes.REGISTER_START:
            return { ...state, loading: true, error: null };

        case ActionTypes.REGISTER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case ActionTypes.REGISTER_ERROR:
            return { ...state, loading: false, error: action.payload };

        case ActionTypes.ADD_BOOKING:
            // The booking is already added to Firebase in BookingModal
            // Just update local state with the Firebase-generated booking
            return { ...state, bookings: [...state.bookings, action.payload] };

        case ActionTypes.UPDATE_BOOKING:
            // The booking is already updated in Firebase in AdminBookings
            // Just update local state
            return {
                ...state,
                bookings: state.bookings.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                )
            };

        case ActionTypes.DELETE_BOOKING:
            // The booking is already deleted from Firebase in AdminBookings
            // Just update local state
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id !== action.payload)
            };

        case ActionTypes.ADD_TOUR:
            return { ...state, tours: [...state.tours, action.payload] };

        case ActionTypes.UPDATE_TOUR:
            return {
                ...state,
                tours: state.tours.map(tour =>
                    tour.id === action.payload.id ? action.payload : tour
                )
            };

        case ActionTypes.DELETE_TOUR:
            return {
                ...state,
                tours: state.tours.filter(tour => tour.id !== action.payload)
            };

        case ActionTypes.ADD_USER:
            return { ...state, users: [...state.users, action.payload] };

        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };

        case ActionTypes.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            };

        case ActionTypes.ADD_DESTINATION:
            return { ...state, destinations: [...state.destinations, action.payload] };

        case ActionTypes.UPDATE_DESTINATION:
            return {
                ...state,
                destinations: state.destinations.map(destination =>
                    destination.id === action.payload.id ? action.payload : destination
                )
            };

        case ActionTypes.DELETE_DESTINATION:
            return {
                ...state,
                destinations: state.destinations.filter(destination => destination.id !== action.payload)
            };

        case ActionTypes.UPDATE_SETTINGS:
            return { ...state, settings: { ...state.settings, ...action.payload } };

        case ActionTypes.SET_MESSAGE:
            return { ...state, message: action.payload };

        case ActionTypes.CLEAR_MESSAGE:
            return { ...state, message: null };

        case ActionTypes.LOAD_DATA:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load data from localStorage and Firebase on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                // Clear old bookings with numeric IDs
                clearOldBookings();

                // Load data from Firebase
                const [firebaseBookings, firebaseUsers, firebaseDestinations] = await Promise.all([
                    getBookings(),
                    getUsers(),
                    getDestinations()
                ]);

                const savedData = {
                    user: JSON.parse(localStorage.getItem('user')),
                    bookings: firebaseBookings,
                    tours: JSON.parse(localStorage.getItem('tours')) || initialState.tours,
                    destinations: firebaseDestinations.length > 0 ? firebaseDestinations : initialState.destinations,
                    users: firebaseUsers.length > 0 ? firebaseUsers : JSON.parse(localStorage.getItem('users')) || [],
                    settings: JSON.parse(localStorage.getItem('settings')) || initialState.settings
                };

                dispatch({ type: ActionTypes.LOAD_DATA, payload: savedData });
            } catch (error) {
                console.error('Error loading data:', error);
                // Fallback to localStorage if Firebase fails
                const savedData = {
                    user: JSON.parse(localStorage.getItem('user')),
                    bookings: JSON.parse(localStorage.getItem('bookings')) || [],
                    tours: JSON.parse(localStorage.getItem('tours')) || initialState.tours,
                    destinations: JSON.parse(localStorage.getItem('destinations')) || initialState.destinations,
                    users: JSON.parse(localStorage.getItem('users')) || [],
                    settings: JSON.parse(localStorage.getItem('settings')) || initialState.settings
                };
                dispatch({ type: ActionTypes.LOAD_DATA, payload: savedData });
            }
        };

        loadData();
    }, []);

    // Save data to localStorage whenever state changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        }
        localStorage.setItem('bookings', JSON.stringify(state.bookings));
        localStorage.setItem('tours', JSON.stringify(state.tours));
        localStorage.setItem('destinations', JSON.stringify(state.destinations));
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('settings', JSON.stringify(state.settings));
    }, [state.user, state.bookings, state.tours, state.destinations, state.users, state.settings]);

    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (state.message) {
            const timer = setTimeout(() => {
                dispatch({ type: ActionTypes.CLEAR_MESSAGE });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [state.message]);

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChange((user) => {
            if (user) {
                const isAdmin = user.email === 'admin@touristhub.com';
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    firstName: user.displayName?.split(' ')[0] || 'User',
                    lastName: user.displayName?.split(' ')[1] || '',
                    role: isAdmin ? 'admin' : 'user'
                };
                dispatch({ type: ActionTypes.SET_USER, payload: userData });
            } else {
                dispatch({ type: ActionTypes.LOGOUT });
            }
        });

        return () => unsubscribe();
    }, []);

    // Authentication functions
    const login = async (email, password) => {
        dispatch({ type: ActionTypes.LOGIN_START });

        const result = await signInUser(email, password);

        if (result.success) {
            // Check if admin user
            const isAdmin = email === 'admin@touristhub.com';
            const user = {
                ...result.user,
                role: isAdmin ? 'admin' : 'user',
                firstName: result.user.displayName?.split(' ')[0] || 'User',
                lastName: result.user.displayName?.split(' ')[1] || ''
            };

            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user });
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { type: 'success', text: 'Login successful!' }
            });
        } else {
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: result.error });
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { type: 'error', text: result.error }
            });
        }
    };

    const register = async (firstName, lastName, email, password) => {
        dispatch({ type: ActionTypes.REGISTER_START });

        const result = await createUser(email, password, firstName, lastName);

        if (result.success) {
            dispatch({ type: ActionTypes.REGISTER_SUCCESS, payload: result.user });
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { type: 'success', text: 'Account created successfully!' }
            });
        } else {
            dispatch({ type: ActionTypes.REGISTER_ERROR, payload: result.error });
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { type: 'error', text: result.error }
            });
        }
    };

    const logout = async () => {
        const result = await signOutUser();

        if (result.success) {
            dispatch({ type: ActionTypes.LOGOUT });
            dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { type: 'info', text: 'Logged out successfully' }
            });
        }
    };

    const value = {
        state,
        dispatch,
        login,
        register,
        logout
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};