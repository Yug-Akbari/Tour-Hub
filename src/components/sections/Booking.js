import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Booking.css';

const Booking = () => {
    const { state, dispatch } = useApp();
    const [searchData, setSearchData] = useState({
        destination: '',
        checkin: '',
        checkout: '',
        guests: '1'
    });

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchData.destination || !searchData.checkin || !searchData.checkout) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Please fill in all required fields' }
            });
            return;
        }

        dispatch({
            type: 'SET_MESSAGE',
            payload: { type: 'info', text: 'Searching for available tours...' }
        });

        // Simulate search
        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: 'Found 5 available tours for your criteria!' }
            });

            // Scroll to tours section
            const element = document.getElementById('tours');
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 1500);
    };

    return (
        <section id="booking" className="booking">
            <div className="container">
                <h2>Quick Booking</h2>
                <form className="booking-form" onSubmit={handleSearch}>
                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <select
                            id="destination"
                            name="destination"
                            value={searchData.destination}
                            onChange={handleChange}
                        >
                            <option value="">Select Destination</option>
                            <option value="mountain">Mountain Peaks</option>
                            <option value="beach">Tropical Beaches</option>
                            <option value="city">Historic Cities</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="checkin">Check-in Date</label>
                        <input
                            type="date"
                            id="checkin"
                            name="checkin"
                            value={searchData.checkin}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="checkout">Check-out Date</label>
                        <input
                            type="date"
                            id="checkout"
                            name="checkout"
                            value={searchData.checkout}
                            onChange={handleChange}
                            min={searchData.checkin || new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="guests">Number of Guests</label>
                        <select
                            id="guests"
                            name="guests"
                            value={searchData.guests}
                            onChange={handleChange}
                        >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5+">5+ Guests</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">
                        Search Tours
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Booking;