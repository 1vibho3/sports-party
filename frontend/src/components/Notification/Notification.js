import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Notification.css'; // Import the CSS file for styling

const userId = sessionStorage.getItem('userID');
const socket = io('http://localhost:5006');

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        console.log('Component mounted');
        console.log('User ID:', userId);

        socket.emit('register', userId);

        const handleNotification = (notification) => {
            console.log('Notification received:', notification);
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        };

        socket.on('notification', handleNotification);

        return () => {
            console.log('Component unmounted');
            socket.off('notification', handleNotification);
        };
    }, [userId]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="notification-container">
            <button onClick={toggleDropdown} className="dropdown-button">
                Notifications {notifications.length > 0 && `(${notifications.length})`}
            </button>
            <ul className="dropdown-menu" style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                {notifications.length === 0 ? (
                    <li className="dropdown-item">No notifications</li>
                ) : (
                    notifications.map((notification, index) => (
                        <li key={index} className="dropdown-item">{notification.message}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Notification;
