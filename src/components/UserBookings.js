import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getBookings } from '../firebase/bookingService';
import './UserBookings.css';

const UserBookings = () => {
    const { state } = useApp();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserBookings = async () => {
            try {
                setLoading(true);
                const allBookings = await getBookings();

                // Filter bookings for current user
                const userBookings = allBookings.filter(booking =>
                    booking.customerEmail === state.user?.email
                );

                setBookings(userBookings);
            } catch (error) {
                console.error('Error loading user bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (state.user) {
            loadUserBookings();
        }
    }, [state.user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'confirmed':
                return 'status-confirmed';
            case 'completed':
                return 'status-completed';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-pending';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!state.user) {
        return (
            <div className="user-bookings">
                <div className="section-header">
                    <h1>My Bookings</h1>
                </div>
                <div className="login-required">
                    <i className="fas fa-sign-in-alt"></i>
                    <h3>Please login to view your bookings</h3>
                    <p>You need to be logged in to see your booking history.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-bookings">
            <div className="section-header">
                <h1>My Bookings</h1>
                <p>View and manage your tour bookings</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loading-spinner">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Loading your bookings...</span>
                    </div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-calendar-times"></i>
                    <h3>No bookings found</h3>
                    <p>You haven't made any bookings yet. Start exploring our amazing tours!</p>
                    <a href="#tours" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                        Browse Tours
                    </a>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                                <h3>{booking.tourName}</h3>
                                <span className={`status-badge ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="booking-details">
                                <div className="detail-item">
                                    <i className="fas fa-hashtag"></i>
                                    <span className="label">Booking ID:</span>
                                    <span className="value">#{booking.id}</span>
                                </div>

                                <div className="detail-item">
                                    <i className="fas fa-calendar"></i>
                                    <span className="label">Booking Date:</span>
                                    <span className="value">{formatDate(booking.bookingDate)}</span>
                                </div>

                                <div className="detail-item">
                                    <i className="fas fa-users"></i>
                                    <span className="label">Guests:</span>
                                    <span className="value">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                </div>

                                <div className="detail-item">
                                    <i className="fas fa-dollar-sign"></i>
                                    <span className="label">Total Price:</span>
                                    <span className="value price">${booking.totalPrice}</span>
                                </div>

                                {booking.specialRequests && (
                                    <div className="detail-item">
                                        <i className="fas fa-comment"></i>
                                        <span className="label">Special Requests:</span>
                                        <span className="value">{booking.specialRequests}</span>
                                    </div>
                                )}
                            </div>

                            <div className="booking-actions">
                                {booking.status === 'pending' && (
                                    <div className="status-info">
                                        <i className="fas fa-clock"></i>
                                        <span>Your booking is being reviewed. We'll confirm it soon!</span>
                                    </div>
                                )}

                                {booking.status === 'confirmed' && (
                                    <div className="status-info confirmed">
                                        <i className="fas fa-check-circle"></i>
                                        <span>Your booking is confirmed! Get ready for an amazing experience!</span>
                                    </div>
                                )}

                                {booking.status === 'completed' && (
                                    <div className="status-info completed">
                                        <i className="fas fa-flag-checkered"></i>
                                        <span>Tour completed! We hope you had a wonderful time!</span>
                                    </div>
                                )}

                                {booking.status === 'cancelled' && (
                                    <div className="status-info cancelled">
                                        <i className="fas fa-times-circle"></i>
                                        <span>This booking has been cancelled.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserBookings;
