import React from 'react';
import { useApp } from '../context/AppContext';
import './Message.css';

const Message = () => {
    const { state, dispatch } = useApp();

    if (!state.message) return null;

    const handleClose = () => {
        dispatch({ type: 'CLEAR_MESSAGE' });
    };

    return (
        <div className={`message message-${state.message.type}`}>
            <div className="message-content">
                <span className="message-text">{state.message.text}</span>
                <button className="message-close" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default Message;
