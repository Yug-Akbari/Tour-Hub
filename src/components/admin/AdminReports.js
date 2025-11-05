import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBookings } from '../../firebase/bookingService';
import { getUsers } from '../../firebase/userService';
import './AdminReports.css';

const AdminReports = () => {
    const { state } = useApp();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        totalUsers: 0,
        bookingsByStatus: {},
        popularTours: [],
        monthlyRevenue: [],
        userGrowth: []
    });

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                setLoading(true);

                // Get all data
                const [bookings, users] = await Promise.all([
                    getBookings(),
                    getUsers()
                ]);

                // Calculate analytics
                const analyticsData = calculateAnalytics(bookings, users);
                setAnalytics(analyticsData);
            } catch (error) {
                console.error('Error loading analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    const calculateAnalytics = (bookings, users) => {
        // Total bookings
        const totalBookings = bookings.length;

        // Total revenue
        const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

        // Total users
        const totalUsers = users.length;

        // Bookings by status
        const bookingsByStatus = bookings.reduce((acc, booking) => {
            const status = booking.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Popular tours
        const tourBookings = bookings.reduce((acc, booking) => {
            const tourName = booking.tourName || 'Unknown Tour';
            acc[tourName] = (acc[tourName] || 0) + 1;
            return acc;
        }, {});

        const popularTours = Object.entries(tourBookings)
            .map(([tour, count]) => ({ tour, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Monthly revenue (last 6 months)
        const monthlyRevenue = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            const monthBookings = bookings.filter(booking => {
                const bookingDate = new Date(booking.createdAt || booking.bookingDate);
                return bookingDate.getMonth() === date.getMonth() &&
                    bookingDate.getFullYear() === date.getFullYear();
            });

            const monthRevenue = monthBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
            monthlyRevenue.push({ month, revenue: monthRevenue, bookings: monthBookings.length });
        }

        // User growth (last 6 months)
        const userGrowth = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            const monthUsers = users.filter(user => {
                const userDate = new Date(user.createdAt || user.joinDate);
                return userDate.getMonth() === date.getMonth() &&
                    userDate.getFullYear() === date.getFullYear();
            });

            userGrowth.push({ month, users: monthUsers.length });
        }

        return {
            totalBookings,
            totalRevenue,
            totalUsers,
            bookingsByStatus,
            popularTours,
            monthlyRevenue,
            userGrowth
        };
    };

    const exportReport = () => {
        const reportData = {
            generatedAt: new Date().toISOString(),
            analytics: analytics
        };

        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tourist-management-report-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="admin-reports">
                <div className="section-header">
                    <h1>Reports & Analytics</h1>
                </div>
                <div className="loading-state">
                    <div className="loading-spinner">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Loading analytics...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-reports">
            <div className="section-header">
                <h1>Reports & Analytics</h1>
                <button className="btn btn-secondary" onClick={exportReport}>
                    <i className="fas fa-download"></i>
                    Export Report
                </button>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="metric-content">
                        <h3>{analytics.totalBookings}</h3>
                        <p>Total Bookings</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="metric-content">
                        <h3>${analytics.totalRevenue.toLocaleString()}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="metric-content">
                        <h3>{analytics.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="metric-content">
                        <h3>{analytics.totalBookings > 0 ? (analytics.totalRevenue / analytics.totalBookings).toFixed(0) : 0}</h3>
                        <p>Avg. Booking Value</p>
                    </div>
                </div>
            </div>

            {/* Detailed Reports */}
            <div className="reports-grid">
                {/* Booking Status */}
                <div className="report-card">
                    <h3>Booking Status</h3>
                    <div className="status-list">
                        {Object.entries(analytics.bookingsByStatus).map(([status, count]) => (
                            <div key={status} className="status-item">
                                <span className={`status-badge status-${status}`}>
                                    {status}
                                </span>
                                <span className="status-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Tours */}
                <div className="report-card">
                    <h3>Popular Tours</h3>
                    <div className="tour-list">
                        {analytics.popularTours.length > 0 ? (
                            analytics.popularTours.map((tour, index) => (
                                <div key={index} className="tour-item">
                                    <span className="tour-name">{tour.tour}</span>
                                    <span className="tour-count">{tour.count} bookings</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-data">No booking data available</p>
                        )}
                    </div>
                </div>

                {/* Monthly Revenue */}
                <div className="report-card">
                    <h3>Monthly Revenue</h3>
                    <div className="revenue-chart">
                        {analytics.monthlyRevenue.map((month, index) => (
                            <div key={index} className="revenue-item">
                                <div className="revenue-month">{month.month}</div>
                                <div className="revenue-bar">
                                    <div
                                        className="revenue-fill"
                                        style={{
                                            width: `${Math.max(5, (month.revenue / Math.max(...analytics.monthlyRevenue.map(m => m.revenue))) * 100)}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="revenue-amount">${month.revenue.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Growth */}
                <div className="report-card">
                    <h3>User Growth</h3>
                    <div className="growth-chart">
                        {analytics.userGrowth.map((month, index) => (
                            <div key={index} className="growth-item">
                                <div className="growth-month">{month.month}</div>
                                <div className="growth-bar">
                                    <div
                                        className="growth-fill"
                                        style={{
                                            width: `${Math.max(5, (month.users / Math.max(...analytics.userGrowth.map(m => m.users), 1)) * 100)}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="growth-count">{month.users} users</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;

