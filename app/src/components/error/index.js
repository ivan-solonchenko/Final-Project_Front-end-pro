import React from 'react';
import './style.css';

const NotFound = () => {
    return (
        <div className='wrapError'>
            <h1>404 - Page not found</h1>
            <p>Sorry, the page you requested does not exist.</p>
        </div>
    );
};

export default NotFound;