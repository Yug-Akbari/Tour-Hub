import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Contact.css';

const Contact = () => {
    const { state, dispatch } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate sending message
        dispatch({
            type: 'SET_MESSAGE',
            payload: { type: 'info', text: 'Sending message...' }
        });

        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: 'Message sent successfully! We will get back to you soon.' }
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <h3>Phone</h3>
                                <p>{state.settings.sitePhone}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h3>Email</h3>
                                <p>{state.settings.siteEmail}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h3>Address</h3>
                                <p>123 Tourism Street, Travel City, TC 12345</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;