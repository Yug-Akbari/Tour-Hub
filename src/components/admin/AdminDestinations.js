import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDestinations, addDestination, updateDestination, deleteDestination } from '../../firebase/destinationService';
import './AdminDestinations.css';

const AdminDestinations = () => {
    const { state, dispatch } = useApp();
    const [loading, setLoading] = useState(true);
    const [showAddDestination, setShowAddDestination] = useState(false);
    const [newDestination, setNewDestination] = useState({
        name: '',
        description: '',
        image: '',
        rating: 5,
        reviews: 0
    });

    useEffect(() => {
        const loadDestinations = async () => {
            try {
                setLoading(true);
                const destinations = await getDestinations();
                dispatch({ type: 'LOAD_DATA', payload: { destinations } });
            } catch (error) {
                console.error('Error loading destinations:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDestinations();
    }, [dispatch]);

    const handleAddDestination = async (e) => {
        e.preventDefault();
        try {
            await addDestination(newDestination);
            const destinations = await getDestinations();
            dispatch({ type: 'LOAD_DATA', payload: { destinations } });
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: 'Destination added successfully!' }
            });
            setShowAddDestination(false);
            setNewDestination({ name: '', description: '', image: '', rating: 5, reviews: 0 });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Failed to add destination' }
            });
        }
    };

    const handleDeleteDestination = async (destinationId) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                await deleteDestination(destinationId);
                const destinations = await getDestinations();
                dispatch({ type: 'LOAD_DATA', payload: { destinations } });
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'success', text: 'Destination deleted successfully!' }
                });
            } catch (error) {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'error', text: 'Failed to delete destination' }
                });
            }
        }
    };

    return (
        <div className="admin-destinations">
            <div className="section-header">
                <h1>Destination Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddDestination(true)}
                >
                    <i className="fas fa-plus"></i>
                    Add Destination
                </button>
            </div>

            {showAddDestination && (
                <div className="add-destination-form">
                    <h3>Add New Destination</h3>
                    <form onSubmit={handleAddDestination}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Destination Name"
                                value={newDestination.name}
                                onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Description"
                                value={newDestination.description}
                                onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="url"
                                placeholder="Image URL"
                                value={newDestination.image}
                                onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="Rating (1-5)"
                                min="1"
                                max="5"
                                value={newDestination.rating}
                                onChange={(e) => setNewDestination({ ...newDestination, rating: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Destination</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddDestination(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="destinations-grid">
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i>
                            <span>Loading destinations...</span>
                        </div>
                    </div>
                ) : state.destinations.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>No destinations found</h3>
                        <p>Add destinations to showcase to your customers.</p>
                    </div>
                ) : (
                    state.destinations.map((destination) => (
                        <div key={destination.id} className="destination-card-admin">
                            <div className="destination-image">
                                <img src={destination.image} alt={destination.name} />
                                <div className="destination-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            // Edit functionality can be added here
                                            console.log('Edit destination:', destination.id);
                                        }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDeleteDestination(destination.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="destination-content">
                                <h3>{destination.name}</h3>
                                <p>{destination.description}</p>
                                <div className="destination-stats">
                                    <span><i className="fas fa-star"></i> {destination.rating}</span>
                                    <span><i className="fas fa-comments"></i> {destination.reviews}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDestinations;