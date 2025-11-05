import React from 'react';
import { useApp } from '../../context/AppContext';
import './Destinations.css';

const Destinations = () => {
    const { state } = useApp();

    return (
        <section id="destinations" className="destinations">
            <div className="container">
                <h2>Popular Destinations</h2>
                <div className="destinations-grid">
                    {state.destinations.map((destination) => (
                        <div key={destination.id} className="destination-card">
                            <div className="card-image">
                                <img src={destination.image} alt={destination.name} />
                                <div className="card-overlay">
                                    <button className="btn-card">Explore</button>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3>{destination.name}</h3>
                                <p>{destination.description}</p>
                                <div className="card-rating">
                                    <i className="fas fa-star"></i>
                                    <span>{destination.rating} ({destination.reviews.toLocaleString()} reviews)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;