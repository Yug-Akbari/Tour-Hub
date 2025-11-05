import React from 'react';
import { useApp } from '../../context/AppContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { state } = useApp();

    // Calculate statistics
    const totalBookings = state.bookings.length;
    const totalRevenue = state.bookings
        .filter(booking => booking.status === 'confirmed')
        .reduce((sum, booking) => {
            const tour = state.tours.find(t => t.name === booking.tourName);
            return sum + (tour ? tour.price * parseInt(booking.guests) : 0);
        }, 0);
    const activeUsers = state.users.length;
    const availableTours = state.tours.length;

    // Get recent bookings
    const recentBookings = state.bookings.slice(-5).reverse();

    return (
        <div className="admin-dashboard">
            <div className="section-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome to the Tourist Management System Admin Panel</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Total Bookings</h3>
                        <p className="stat-number">{totalBookings}</p>
                        <span className="stat-change positive">+12% this month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Revenue</h3>
                        <p className="stat-number">${totalRevenue.toLocaleString()}</p>
                        <span className="stat-change positive">+8% this month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Active Users</h3>
                        <p className="stat-number">{activeUsers}</p>
                        <span className="stat-change positive">+5% this month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Available Tours</h3>
                        <p className="stat-number">{availableTours}</p>
                        <span className="stat-change neutral">No change</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="chart-container">
                    <h3>Booking Trends</h3>
                    <div className="chart-placeholder">
                        <i className="fas fa-chart-line"></i>
                        <p>Chart visualization would go here</p>
                    </div>
                </div>

                <div className="recent-activity">
                    <h3>Recent Bookings</h3>
                    <div className="activity-list">
                        {recentBookings.length === 0 ? (
                            <div className="empty-state">
                                <i className="fas fa-calendar"></i>
                                <h3>No bookings yet</h3>
                                <p>Bookings will appear here once customers start booking tours.</p>
                            </div>
                        ) : (
                            recentBookings.map(booking => (
                                <div key={booking.id} className="activity-item">
                                    <div className="activity-icon">
                                        <i className="fas fa-calendar-check"></i>
                                    </div>
                                    <div className="activity-content">
                                        <h4>{booking.tourName}</h4>
                                        <p>{booking.guests} guests • {booking.bookingDate}</p>
                                    </div>
                                    <div className="activity-time">
                                        <span className={`status-badge status-${booking.status}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;