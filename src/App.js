import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import UserBookings from './components/UserBookings';
import Message from './components/Message';
import './App.css';

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Message />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/my-bookings" element={<UserBookings />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
