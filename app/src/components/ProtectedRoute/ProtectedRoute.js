import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            navigate('/');
        } else if (loggedInUser.role === 'admin') {
            navigate('/admin');
        }
    }, [navigate]);

    return (
        <div>
            {children}
        </div>
    );
}

export default ProtectedRoute;