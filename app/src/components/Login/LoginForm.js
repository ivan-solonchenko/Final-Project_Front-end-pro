import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function LoginForm() {
    const navigate = useNavigate();
    const server = 'http://localhost:8080/api/users';
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function addUserToStore(user) {
        const userToStore = {
            email: user.email,
            password: user.password,
            role: user.role,
        };

        localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
    }

    function navigateTheUser(user) {
        if (user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/home');
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'password') {
            setIsPasswordValid(value.length >= 6);
        }
    }

    function clearFields() {
        setFormData({
            email: '',
            password: '',
        });
        setIsPasswordValid(false);
    }

    function handleLogin() {
        if (!isPasswordValid) {
            message.error('Пароль повинен містити щонайменше 6 символів');
            return;
        }

        fetch(server)
            .then((response) => response.json())
            .then((users) => {
                const foundUser = users.find((user) => user.email === formData.email);

                if (foundUser) {
                    const isPasswordValid = bcrypt.compareSync(formData.password, foundUser.password);

                    if (isPasswordValid) {
                        message.success('Ви увійшли!');
                        addUserToStore(foundUser);
                        navigateTheUser(foundUser);
                        clearFields();
                    } else {
                        document.getElementById('password').value = '';
                        message.error('Ви ввели невірний пароль!');
                    }
                } else {
                    message.error(
                        'Користувача з таким email та паролем не знайдено. Зареєструйтесь!'
                    );
                    navigate('/register');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="login-content">
            <Form
                className="login-form"
                layout="vertical"
                onFinish={handleLogin}
            >
                <h2 className="login-form__title">Вхід<hr /></h2>

                <Form.Item
                    className={'no-star'}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Будь ласка, введіть email' }]}
                >
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                    />
                </Form.Item>
                <Form.Item
                    className={'no-star'}
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}
                >
                    <Input.Password
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                    />
                </Form.Item>
                <Form.Item>
                    <button className="login-form__button" type="submit">
                        Увійти
                    </button>
                </Form.Item>
                <Link className={'login-form__link'} to="/register">
                    Не маєте облікового запису? <strong>Зареєструватися</strong>
                </Link>
            </Form>
        </div>
    );
}

export default LoginForm;