import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { addBooking } from '../../firebase/bookingService';
import './Modal.css';

const BookingModal = ({ tour, onClose, onSubmit }) => {
    const { state, dispatch } = useApp();
    const [formData, setFormData] = useState({
        tourName: tour?.name || '',
        guests: '1',
        bookingDate: '',
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.user) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Please login to make a booking' }
            });
            return;
        }

        if (!formData.bookingDate) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Please select a booking date.' }
            });
            return;
        }

        try {
            setLoading(true);

            const bookingData = {
                tourName: formData.tourName,
                customerName: `${state.user.firstName} ${state.user.lastName}`,
                customerEmail: state.user.email,
                guests: parseInt(formData.guests),
                bookingDate: formData.bookingDate,
                specialRequests: formData.specialRequests,
                status: 'pending',
                totalPrice: tour ? tour.price * parseInt(formData.guests) : 0
            };

            // Add booking to Firebase
            const newBooking = await addBooking(bookingData);

            // Update local state
            dispatch({ type: 'ADD_BOOKING', payload: newBooking });
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: 'Booking created successfully!' }
            });

            if (onSubmit) {
                onSubmit(newBooking);
            } else {
                onClose();
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Failed to create booking. Please try again.' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Book Tour</h2>
                    <button className="modal-close" onClick={onClose}><i class="fas fa-times"></i></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Tour Name</label>
                            <input
                                type="text"
                                name="tourName"
                                value={formData.tourName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>Number of Guests</label>
                            <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                required
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Booking Date</label>
                            <input
                                type="date"
                                name="bookingDate"
                                value={formData.bookingDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Special Requests (Optional)</label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Any special requirements or requests..."
                            />
                        </div>

                        {tour && (
                            <div className="booking-summary">
                                <h3>Booking Summary</h3>
                                <div className="summary-item">
                                    <span>Tour:</span>
                                    <span>{tour.name}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Price per person:</span>
                                    <span>${tour.price}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Number of guests:</span>
                                    <span>{formData.guests}</span>
                                </div>
                                <div className="summary-item total">
                                    <span>Total Price:</span>
                                    <span>${tour.price * parseInt(formData.guests)}</span>
                                </div>
                            </div>
                        )}

                        <div className="modal-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Creating Booking...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-calendar-check"></i>
                                        Book Tour
                                    </>
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
