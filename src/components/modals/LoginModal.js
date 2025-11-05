import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Modal.css';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
    const { login, state } = useApp();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData.email, formData.password);
            onClose();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Login</h2>
                    <button className="modal-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>

                <p className="modal-switch">
                    Don't have an account?
                    <button
                        type="button"
                        className="btn-link"
                        onClick={onSwitchToRegister}
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;