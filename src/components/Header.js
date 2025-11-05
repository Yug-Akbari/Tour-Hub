import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import './Header.css';

const Header = () => {
    const { state, dispatch, logout } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if scrolled past 50px for background change
            setIsScrolled(currentScrollY > 50);

            // Hide/show header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past 100px - hide header
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY || currentScrollY <= 10) {
                // Scrolling up or at top - show header
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        const handleClickOutside = (event) => {
            if (showUserDropdown && !event.target.closest('.nav-user') && !event.target.closest('.user-dropdown')) {
                setShowUserDropdown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showUserDropdown]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            // If not on home page, navigate to home first
            window.location.href = `/#${sectionId}`;
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHeaderVisible ? 'visible' : 'hidden'}`}>
                <div className="nav-container">
                    <Link to="/" className="nav-logo">
                        <i className="fas fa-map-marked-alt"></i>
                        <span>TouristHub</span>
                    </Link>

                    <ul className="nav-menu">
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('home')}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('destinations')}
                            >
                                Destinations
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('tours')}
                            >
                                Tours
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('booking')}
                            >
                                Booking
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection('contact')}
                            >
                                Contact
                            </button>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        {state.user ? (
                            <div className="user-section">
                                <div
                                    className="nav-user"
                                    onClick={() => {
                                        console.log('Dropdown clicked, current state:', showUserDropdown);
                                        setShowUserDropdown(!showUserDropdown);
                                    }}
                                >
                                    <div className="user-avatar">
                                        {state.user.firstName?.charAt(0) || 'U'}
                                    </div>
                                    <div className="user-info">
                                        <div className="user-name">{state.user.firstName}</div>
                                        <div className="user-role">{state.user.role}</div>
                                    </div>
                                    <i className={`fas fa-chevron-down ${showUserDropdown ? 'rotated' : ''}`}></i>
                                </div>

                                {showUserDropdown && createPortal(
                                    <div
                                        className="user-dropdown-portal"
                                        style={{
                                            position: 'fixed',
                                            top: '80px',
                                            right: '20px',
                                            zIndex: 9999
                                        }}
                                    >
                                        <div className="dropdown-menu show">
                                            <Link to="/my-bookings" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                                                <i className="fas fa-calendar-check"></i>
                                                My Bookings
                                            </Link>
                                            {state.user.role === 'admin' && (
                                                <Link to="/admin" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                                                    <i className="fas fa-cogs"></i>
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item btn-logout" onClick={() => {
                                                handleLogout();
                                                setShowUserDropdown(false);
                                            }}>
                                                <i className="fas fa-sign-out-alt"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </div>,
                                    document.body
                                )}

                                {/* Always visible logout button */}
                                <button
                                    className="btn btn-logout-direct"
                                    onClick={handleLogout}
                                    title="Logout"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="btn btn-login"
                                    onClick={() => setShowLoginModal(true)}
                                >
                                    <i className="fas fa-sign-in-alt"></i>
                                    Login
                                </button>
                                <button
                                    className="btn btn-register"
                                    onClick={() => setShowRegisterModal(true)}
                                >
                                    <i className="fas fa-user-plus"></i>
                                    Register
                                </button>
                            </>
                        )}

                        <button className="mobile-menu-toggle" onClick={toggleMenu}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <button className="mobile-menu-close" onClick={toggleMenu}>
                    <i className="fas fa-times"></i>
                </button>
                <ul className="mobile-nav-menu">
                    <li className="mobile-nav-item">
                        <button
                            className="mobile-nav-link"
                            onClick={() => scrollToSection('home')}
                        >
                            Home
                        </button>
                    </li>
                    <li className="mobile-nav-item">
                        <button
                            className="mobile-nav-link"
                            onClick={() => scrollToSection('destinations')}
                        >
                            Destinations
                        </button>
                    </li>
                    <li className="mobile-nav-item">
                        <button
                            className="mobile-nav-link"
                            onClick={() => scrollToSection('tours')}
                        >
                            Tours
                        </button>
                    </li>
                    <li className="mobile-nav-item">
                        <button
                            className="mobile-nav-link"
                            onClick={() => scrollToSection('booking')}
                        >
                            Booking
                        </button>
                    </li>
                    <li className="mobile-nav-item">
                        <button
                            className="mobile-nav-link"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </button>
                    </li>
                </ul>
                <div className="mobile-nav-actions">
                    {state.user ? (
                        <>
                            <Link to="/my-bookings" className="btn btn-primary">
                                <i className="fas fa-calendar-check"></i>
                                My Bookings
                            </Link>
                            {state.user.role === 'admin' && (
                                <Link to="/admin" className="btn btn-warning">
                                    <i className="fas fa-cogs"></i>
                                    Admin Panel
                                </Link>
                            )}
                            <button className="btn btn-danger" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-login"
                                onClick={() => {
                                    setShowLoginModal(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                Login
                            </button>
                            <button
                                className="btn btn-register"
                                onClick={() => {
                                    setShowRegisterModal(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <i className="fas fa-user-plus"></i>
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                />
            )}

            {showRegisterModal && (
                <RegisterModal
                    onClose={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                />
            )}
        </>
    );
};

export default Header;
