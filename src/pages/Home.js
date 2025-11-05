import React from 'react';
import Hero from '../components/sections/Hero';
import Destinations from '../components/sections/Destinations';
import Tours from '../components/sections/Tours';
import Booking from '../components/sections/Booking';
import Contact from '../components/sections/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Destinations />
            <Tours />
            <Booking />
            <Contact />
        </main>
    );
};

export default Home;
