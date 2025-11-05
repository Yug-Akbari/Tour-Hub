import React from 'react';
import './BookingConfirmation.css';

const BookingConfirmation = ({ booking, onClose, onPrint }) => {
    if (!booking) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content booking-confirmation" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <i className="fas fa-check-circle"></i>
                        Booking Confirmed!
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="booking-details">
                    <div className="booking-id">
                        <strong>Booking ID:</strong> #{booking.id}
                    </div>

                    <div className="detail-section">
                        <h3>Tour Details</h3>
                        <div className="detail-item">
                            <span>Tour Name:</span>
                            <span>{booking.tourName}</span>
                        </div>
                        <div className="detail-item">
                            <span>Booking Date:</span>
                            <span>{booking.bookingDate}</span>
                        </div>
                        <div className="detail-item">
                            <span>Number of Guests:</span>
                            <span>{booking.guests}</span>
                        </div>
                        <div className="detail-item">
                            <span>Status:</span>
                            <span className={`status-badge status-${booking.status}`}>
                                {booking.status}
                            </span>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Customer Details</h3>
                        <div className="detail-item">
                            <span>Name:</span>
                            <span>{booking.customerName}</span>
                        </div>
                        <div className="detail-item">
                            <span>Email:</span>
                            <span>{booking.customerEmail}</span>
                        </div>
                    </div>

                    {booking.specialRequests && (
                        <div className="detail-section">
                            <h3>Special Requests</h3>
                            <p>{booking.specialRequests}</p>
                        </div>
                    )}

                    <div className="detail-section total-section">
                        <h3>Total Price</h3>
                        <div className="total-price">
                            ${booking.totalPrice}
                        </div>
                    </div>
                </div>

                <div className="booking-actions">
                    <button className="btn btn-secondary" onClick={onPrint}>
                        <i className="fas fa-print"></i>
                        Print Confirmation
                    </button>
                    <button className="btn btn-primary" onClick={onClose}>
                        <i className="fas fa-check"></i>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;