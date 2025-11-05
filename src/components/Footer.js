import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>TouristHub</h3>
                        <p>Your gateway to amazing travel experiences around the world.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#destinations">Destinations</a></li>
                            <li><a href="#tours">Tours</a></li>
                            <li><a href="#booking">Booking</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Newsletter</h4>
                        <p>Subscribe to get updates on new destinations and offers.</p>
                        <div className="newsletter">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit" className="btn btn-sm btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 TouristHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;