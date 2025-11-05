import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminBookings from '../components/admin/AdminBookings';
import AdminTours from '../components/admin/AdminTours';
import AdminUsers from '../components/admin/AdminUsers';
import AdminDestinations from '../components/admin/AdminDestinations';
import AdminReports from '../components/admin/AdminReports';
import AdminSettings from '../components/admin/AdminSettings';
import './Admin.css';

const Admin = () => {
    const { state } = useApp();
    const [activeSection, setActiveSection] = useState('dashboard');

    // Redirect to home if not admin
    if (!state.user || state.user.role !== 'admin') {
        return (
            <div className="admin-access-denied">
                <div className="access-denied-content">
                    <i className="fas fa-lock"></i>
                    <h2>Access Denied</h2>
                    <p>You need admin privileges to access this page.</p>
                    <a href="/" className="btn btn-primary">Go to Home</a>
                </div>
            </div>
        );
    }

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'bookings':
                return <AdminBookings />;
            case 'tours':
                return <AdminTours />;
            case 'users':
                return <AdminUsers />;
            case 'destinations':
                return <AdminDestinations />;
            case 'reports':
                return <AdminReports />;
            case 'settings':
                return <AdminSettings />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            <main className="admin-main">
                {renderSection()}
            </main>
        </div>
    );
};

export default Admin;