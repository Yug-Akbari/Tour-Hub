import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBookings, updateBooking, deleteBooking } from '../../firebase/bookingService';
import './AdminBookings.css';

const AdminBookings = () => {
    const { state, dispatch } = useApp();
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                const bookings = await getBookings();
                console.log('Loaded bookings:', bookings);
                dispatch({ type: 'LOAD_DATA', payload: { bookings } });
            } catch (error) {
                console.error('Error loading bookings:', error);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'error', text: 'Failed to load bookings. Please check your Firebase connection.' }
                });
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [dispatch]);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            setActionLoading(prev => ({ ...prev, [bookingId]: true }));

            console.log('Updating booking status:', bookingId, newStatus);
            console.log('Booking ID type:', typeof bookingId);

            // Ensure bookingId is properly formatted
            const id = String(bookingId).trim();
            if (!id) {
                throw new Error('Invalid booking ID');
            }

            await updateBooking(id, { status: newStatus });

            // Reload bookings from Firebase to get updated data
            const updatedBookings = await getBookings();
            dispatch({ type: 'LOAD_DATA', payload: { bookings: updatedBookings } });

            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: `Booking ${newStatus} successfully!` }
            });
        } catch (error) {
            console.error('Error updating booking status:', error);
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    type: 'error',
                    text: `Failed to update booking status: ${error.message}`
                }
            });
        } finally {
            setActionLoading(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                setActionLoading(prev => ({ ...prev, [bookingId]: true }));

                console.log('Deleting booking:', bookingId);
                console.log('Booking ID type:', typeof bookingId);

                // Ensure bookingId is properly formatted
                const id = String(bookingId).trim();
                if (!id) {
                    throw new Error('Invalid booking ID');
                }

                await deleteBooking(id);

                // Reload bookings from Firebase to get updated data
                const updatedBookings = await getBookings();
                dispatch({ type: 'LOAD_DATA', payload: { bookings: updatedBookings } });

                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'success', text: 'Booking deleted successfully!' }
                });
            } catch (error) {
                console.error('Error deleting booking:', error);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: {
                        type: 'error',
                        text: `Failed to delete booking: ${error.message}`
                    }
                });
            } finally {
                setActionLoading(prev => ({ ...prev, [bookingId]: false }));
            }
        }
    };

    return (
        <div className="admin-bookings">
            <div className="section-header">
                <h1>Booking Management</h1>
                <p>Manage all tour bookings and their status</p>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tour Name</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Guests</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="loading-state">
                                    <div className="loading-spinner">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        <span>Loading bookings...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : state.bookings.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="empty-state">
                                    <i className="fas fa-calendar"></i>
                                    <h3>No bookings found</h3>
                                    <p>Bookings will appear here once customers start booking tours.</p>
                                </td>
                            </tr>
                        ) : (
                            state.bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>#{booking.id}</td>
                                    <td>{booking.tourName}</td>
                                    <td>{booking.customerName || 'N/A'}</td>
                                    <td>{booking.customerEmail || 'N/A'}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.guests}</td>
                                    <td>${booking.totalPrice || 0}</td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {booking.status === 'pending' && (
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                    disabled={actionLoading[booking.id]}
                                                >
                                                    {actionLoading[booking.id] ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-check"></i>
                                                    )}
                                                    Confirm
                                                </button>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                                    disabled={actionLoading[booking.id]}
                                                >
                                                    {actionLoading[booking.id] ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-flag-checkered"></i>
                                                    )}
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteBooking(booking.id)}
                                                disabled={actionLoading[booking.id]}
                                            >
                                                {actionLoading[booking.id] ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    <i className="fas fa-trash"></i>
                                                )}
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookings;