import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login() {
const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser && loggedInUser.role === 'admin') {
            navigate('/admin');
        } else if (!loggedInUser) {
            navigate('/');
        } else {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <LoginForm />
    );
}

export default Login;