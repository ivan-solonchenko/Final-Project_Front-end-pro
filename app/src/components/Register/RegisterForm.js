import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
    const navigate = useNavigate();
    const server = 'http://localhost:8080/api/users';
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'password') {
            if (value.length >= 6) {
                setIsPasswordValid(true);
            } else {
                setIsPasswordValid(false);
            }
        }
    }

    function createUserAndFetch(users, server, formData, hashedPassword) {
        const newUserId = users.length + 1;

        const newUser = {
            id: newUserId,
            name: formData.name,
            email: formData.email,
            password: hashedPassword,
            role: 'user'
        };

        return fetch(server, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
    }

    function clearFields() {
        setFormData(prevData => ({
            ...prevData,
            email: '',
            password: '',
        }));
        setIsPasswordValid(false);
    }

    function handleRegister() {
        if (!isPasswordValid) {
            message.error('Пароль повинен містити щонайменше 6 символів');
            setFormData(prevData => ({
                ...prevData,
                password: '',
            }));
            return;
        }

        bcrypt.hash(formData.password, 10)
            .then(hashedPassword => {
                fetch(server)
                    .then(response => response.json())
                    .then(users => {
                        const existingUser = users.find(user => user.email === formData.email);

                        if (existingUser) {
                            message.error("Користувач з такою поштою вже існує");
                            clearFields()
                        } else {
                            return createUserAndFetch(users, server, formData, hashedPassword);
                        }
                    })
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
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="login-content">
            <Form className="login-form"
                  layout="vertical"
                  onFinish={handleRegister}
            >
                <h2 className="login-form__title">Реєстрація
                    <hr />
                </h2>

                <Form.Item
                    label="Ім'я"
                    name="name"
                    rules={[{ required: true, message: "Будь ласка, введіть ваше ім'я" }]}
                >
                    <Input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        value={formData.email}
                        onChange={handleInputChange}
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
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item>
                    <button
                        className="login-form__button"
                        type="submit"
                    >
                        Зареєструватися
                    </button>
                </Form.Item>
                <Link className={"login-form__link"}
                      to="/"
                >
                    Вже є обліковий запис. <strong>Увійти</strong>
                </Link>
            </Form>
        </div>
    );
};

export default RegisterForm;