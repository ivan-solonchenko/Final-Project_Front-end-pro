import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(fetchedUsers => setUsers(fetchedUsers))
            .catch(error => console.error('Error:', error));
    }, []);

    function createUserAndFetch(name, email, hashedPassword) {
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
        const existingUser = users.find(user => user.email === emailValue);

        if (existingUser) {
            message.error("A user with this email already exists");
        } else {
            return createUserAndFetch(nameValue, emailValue, hashedPassword);
        }
    }

    function handleRegister() {
        if (!isPasswordValid) {
            message.error("The password must contain at least 6 characters");
            return;
        }

        bcrypt.hash(passwordValue, 10)
            .then(hashedPassword => checkUserExistsAndRegister(hashedPassword))
            .then(createUserResponse => {
                if (createUserResponse && createUserResponse.ok) {
                    message.success("Congratulations! You have successfully registered.");
                    navigate('/');
                } else {
                    message.error("Failed to register. Try again");
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
                <h2 className="login-form__title">MediCover Register<hr /></h2>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
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
                    rules={[{ required: true, message: "Please enter your email" }]}
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
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    rules={[{ required: true, message: "Please enter a password" }]}
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
                        Sign up
                    </button>
                </Form.Item>
                <Link className={"login-form__link"} to="/">
                    Already have an account. <strong>Sign in</strong>
                </Link>
            </Form>
        </div>
    );
};

export default RegisterForm;