import React from 'react';
import { useApp } from '../../context/AppContext';
import './AdminTours.css';

const AdminTours = () => {
    const { state } = useApp();

    return (
        <div className="admin-tours">
            <div className="section-header">
                <h1>Tour Management</h1>
                <button className="btn btn-primary" onClick={() => console.log('Add Tour clicked')}>
                    <i className="fas fa-plus"></i>
                    Add Tour
                </button>
            </div>

            <div className="tours-grid">
                {state.tours.map((tour) => (
                    <div key={tour.id} className="tour-card-admin">
                        <div className="tour-image">
                            <img src={tour.image} alt={tour.name} />
                            <div className="tour-actions">
                                <button className="btn-edit">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn-delete">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div className="tour-content">
                            <h3>{tour.name}</h3>
                            <p>{tour.description}</p>
                            <div className="tour-details">
                                <span className="tour-price">${tour.price}</span>
                                <span className="tour-duration">{tour.duration}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTours;