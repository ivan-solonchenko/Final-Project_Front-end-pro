import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    function createUserAndFetch(users, name, email, hashedPassword) {
        const newUserId = users.length + 1;

        const newUser = {
            id: newUserId,
            name,
            email,
            password: hashedPassword,
            role: 'user'
        };

        return fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    }

    function checkUserExistsAndRegister(hashedPassword) {
        return fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(users => {
                const existingUser = users.find(user => user.email === emailValue);

                if (existingUser) {
                    message.error("Користувач з такою поштою вже існує");
                } else {
                    return createUserAndFetch(users, nameValue, emailValue, hashedPassword);
                }
            });
    }

    function handleRegister() {
        if (!isPasswordValid) {
            message.error('Пароль повинен містити щонайменше 6 символів');
            return;
        }

        bcrypt.hash(passwordValue, 10)
            .then(checkUserExistsAndRegister)
            .then(createUserResponse => {
                if (createUserResponse && createUserResponse.ok) {
                    message.success('Вітаємо! Ви успішно зареєструвались.');
                    navigate('/');
                } else {
                    message.error("Не вдалося зареєструватись. Спробуйте ще раз");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="login-content">
            <Form
                className="login-form"
                layout="vertical"
                onFinish={handleRegister}
            >
                <h2 className="login-form__title">Реєстрація<hr /></h2>

                <Form.Item
                    label="Ім'я"
                    name="name"
                    rules={[{ required: true, message: "Будь ласка, введіть ваше ім'я" }]}
                >
                    <Input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Будь ласка, введіть email" }]}
                >
                    <Input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    autoComplete="current-password"
                    rules={[{ required: true, message: "Будь ласка, введіть пароль" }]}
                >
                    <Input.Password
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={passwordValue}
                        onChange={(e) => {
                            setPasswordValue(e.target.value);
                            setIsPasswordValid(e.target.value.length >= 6);
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <button className="login-form__button" type="submit">
                        Зареєструватися
                    </button>
                </Form.Item>
                <Link className={"login-form__link"} to="/">
                    Вже є обліковий запис. <strong>Увійти</strong>
                </Link>
            </Form>
        </div>
    );
};

export default RegisterForm;
