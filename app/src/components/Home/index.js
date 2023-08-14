import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            if (loggedInUser.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        }
    }, [navigate]);

    return (
        <div>
            Home
        </div>
    );
};

export default Home;