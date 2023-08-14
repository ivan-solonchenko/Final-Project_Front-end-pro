import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from "./RegisterForm";

function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            if (loggedInUser.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
                console.log(loggedInUser.role);
            }
        }
    }, [navigate]);

    return (
        <RegisterForm />
    );
}

export default Register;