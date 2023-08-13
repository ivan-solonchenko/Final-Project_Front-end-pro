import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    let user = localStorage.getItem('loggedInUser')
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            navigate('/');
        } else if (loggedInUser.role === 'admin') {
            navigate('/admin');
        }
    }, [navigate]);

    return (
        <div className='parent-page'>
            <div className='parent-page__nav'>
                <h1 className='parent-page__title'>
                    <span className='parent-page__blue'>Medi</span> <span className='parent-page__yellow'>Cover</span>
                </h1>
                {user && (<div>
                    <h3 className='parent-page__appointments' onClick={navigate('/doctors')}>Appointments</h3>
                    <h3 onClick={() => {
                        navigate('/')
                        localStorage.removeItem('loggedInUser')
                    }}><img src="../../pictures/logout.png" alt="LogOut" /></h3>
                </div>)}
            </div>
            <div>{children}</div>

        </div>
    );
}

export default ProtectedRoute;