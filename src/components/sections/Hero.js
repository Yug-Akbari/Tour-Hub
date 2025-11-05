import React from 'react';
import './Hero.css';

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Discover Amazing Destinations</h1>
                <p>Plan your perfect trip with our comprehensive tourist management system</p>
                <div className="hero-buttons">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => scrollToSection('tours')}
                    >
                        Explore Tours
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => scrollToSection('booking')}
                    >
                        Book Now
                    </button>
                </div>
            </div>
            <div className="hero-image">
                <div className="floating-card">
                    <i className="fas fa-users"></i>
                    <span>10,000+ Happy Travelers</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;