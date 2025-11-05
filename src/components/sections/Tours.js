import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import BookingModal from '../modals/BookingModal';
import BookingConfirmation from '../modals/BookingConfirmation';
import './Tours.css';

const Tours = () => {
    const { state } = useApp();
    const [selectedTour, setSelectedTour] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [lastBooking, setLastBooking] = useState(null);

    const handleBookTour = (tour) => {
        if (!state.user) {
            // Show login message
            return;
        }
        setSelectedTour(tour);
        setShowBookingModal(true);
    };

    const handleBookingSubmit = (booking) => {
        setLastBooking(booking);
        setShowBookingModal(false);
        setShowConfirmation(true);
    };

    const handlePrintConfirmation = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
      <html>
        <head>
          <title>Booking Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin: 20px 0; }
            .detail-item { display: flex; justify-content: space-between; margin: 10px 0; }
            .total { font-size: 1.2em; font-weight: bold; border-top: 2px solid #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Booking Confirmation</h1>
            <p>Booking ID: #${lastBooking.id}</p>
          </div>
          <div class="details">
            <h3>Tour Details</h3>
            <div class="detail-item">
              <span>Tour Name:</span>
              <span>${lastBooking.tourName}</span>
            </div>
            <div class="detail-item">
              <span>Booking Date:</span>
              <span>${lastBooking.bookingDate}</span>
            </div>
            <div class="detail-item">
              <span>Number of Guests:</span>
              <span>${lastBooking.guests}</span>
            </div>
            <div class="detail-item">
              <span>Status:</span>
              <span>${lastBooking.status}</span>
            </div>
            <div class="detail-item total">
              <span>Total Price:</span>
              <span>$${lastBooking.totalPrice}</span>
            </div>
          </div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <section id="tours" className="tours">
            <div className="container">
                <h2>Featured Tours</h2>
                <div className="tours-grid">
                    {state.tours.map((tour) => (
                        <div key={tour.id} className="tour-card">
                            <div className="tour-image">
                                <img src={tour.image} alt={tour.name} />
                                <div className="tour-badge">Popular</div>
                            </div>
                            <div className="tour-content">
                                <h3>{tour.name}</h3>
                                <p>{tour.description}</p>
                                <div className="tour-details">
                                    <div className="tour-info">
                                        <i className="fas fa-clock"></i>
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="tour-info">
                                        <i className="fas fa-users"></i>
                                        <span>Max {tour.maxGuests}</span>
                                    </div>
                                    <div className="tour-info">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>Multiple</span>
                                    </div>
                                </div>
                                <div className="tour-price">
                                    <span className="price">${tour.price}</span>
                                    <button
                                        className="btn-book"
                                        onClick={() => handleBookTour(tour)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showBookingModal && selectedTour && (
                <BookingModal
                    tour={selectedTour}
                    onClose={() => {
                        setShowBookingModal(false);
                        setSelectedTour(null);
                    }}
                    onSubmit={handleBookingSubmit}
                />
            )}

            {showConfirmation && lastBooking && (
                <BookingConfirmation
                    booking={lastBooking}
                    onClose={() => {
                        setShowConfirmation(false);
                        setLastBooking(null);
                    }}
                    onPrint={handlePrintConfirmation}
                />
            )}
        </section>
    );
};

export default Tours;