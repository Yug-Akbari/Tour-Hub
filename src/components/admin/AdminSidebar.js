import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ activeSection, onSectionChange }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
        { id: 'bookings', icon: 'fas fa-calendar-check', label: 'Bookings' },
        { id: 'tours', icon: 'fas fa-map-marked-alt', label: 'Tours' },
        { id: 'users', icon: 'fas fa-users', label: 'Users' },
        { id: 'destinations', icon: 'fas fa-map-marker-alt', label: 'Destinations' },
        { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <Link to="/" className="sidebar-logo">
                    <i className="fas fa-cogs"></i>
                    <span>Admin Panel</span>
                </Link>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => onSectionChange(item.id)}
                    >
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <Link to="/" className="btn btn-sm btn-secondary">
                    <i className="fas fa-external-link-alt"></i>
                    Main Site
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;