import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './AdminSettings.css';

const AdminSettings = () => {
    const { state, dispatch } = useApp();
    const [settings, setSettings] = useState(state.settings);

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
        dispatch({
            type: 'SET_MESSAGE',
            payload: { type: 'success', text: 'Settings saved successfully!' }
        });
    };

    return (
        <div className="admin-settings">
            <div className="section-header">
                <h1>System Settings</h1>
            </div>

            <div className="settings-content">
                <div className="settings-group">
                    <h3>General Settings</h3>
                    <div className="setting-item">
                        <label htmlFor="siteName">Site Name</label>
                        <input
                            type="text"
                            id="siteName"
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="setting-item">
                        <label htmlFor="siteEmail">Contact Email</label>
                        <input
                            type="email"
                            id="siteEmail"
                            name="siteEmail"
                            value={settings.siteEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="setting-item">
                        <label htmlFor="sitePhone">Contact Phone</label>
                        <input
                            type="tel"
                            id="sitePhone"
                            name="sitePhone"
                            value={settings.sitePhone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="settings-group">
                    <h3>Booking Settings</h3>
                    <div className="setting-item">
                        <label htmlFor="maxGuests">Maximum Guests per Booking</label>
                        <input
                            type="number"
                            id="maxGuests"
                            name="maxGuests"
                            value={settings.maxGuests}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="setting-item">
                        <label htmlFor="advanceBooking">Advance Booking Days</label>
                        <input
                            type="number"
                            id="advanceBooking"
                            name="advanceBooking"
                            value={settings.advanceBooking}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handleSave}>
                    <i className="fas fa-save"></i>
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;