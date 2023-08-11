import { Form, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Login() {
    const navigate = useNavigate();
    const server = 'http://localhost:8080/api/users';
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) navigate("/home");
    }, [navigate]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "password") {
            if (value.length >= 6) {
                setIsPasswordValid(true);
            } else {
                setIsPasswordValid(false);
            }
        }
    };

    const clearFields = () => {
        setFormData({
            email: '',
            password: '',
        });
        setIsPasswordValid(true);
    };

    const handleLogin  = async () => {
        try {
            if (!isPasswordValid) {
                message.error('Пароль повинен містити щонайменше 6 символів');
                return;
            }

            const response = await fetch(server);
            const users = await response.json();

            const foundUser = users.find(user => user.email === formData.email);

            if (foundUser) {
                const isPasswordValid = bcrypt.compareSync(formData.password, foundUser.password);

                if (isPasswordValid) {
                    message.success('Ви увійшли!');

                    const userToStore = {
                        email: foundUser.email,
                        password: foundUser.password,
                    };

                    localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
                    navigate('/home');
                    clearFields();
                } else {
                    message.error('Ви ввели невірний пароль!');
                    // setFormData(formData.password = '')//////////////////////////////
                }
            } else {
                message.error('Користувача з таким email та паролем не знайдено. Зареєструйтесь!');
                navigate('/register');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="login-content">
            <Form layout="vertical" className="login-form" onFinish={handleLogin }>
                <h2 className="login-form-title">Вхід
                    <hr />
                </h2>
                <Form.Item label="Email" className={"no-star"} name="email"
                           rules={[{ required: true, message: 'Будь ласка, введіть email' }]}>
                    <Input type="email"  name="email" value={formData.email} onChange={handleInputChange} autoComplete="email"/>
                </Form.Item>
                <Form.Item label="Пароль" className={"no-star"} name="password" rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}>
                    <Input.Password type="password" name="password" value={formData.password} onChange={handleInputChange} autoComplete="current-password"/>
                </Form.Item>
                <Form.Item>
                    <button className="login-button" type="submit" >
                        Увійти
                    </button>
                </Form.Item>
                <Link className={"myLink"} to="/register">
                    Не маєте облікового запису? <strong>Зареєструватися</strong>
                </Link>
            </Form>
        </div>
    );
}

export default Login;
