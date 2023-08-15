import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function LoginForm() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [form] = Form.useForm();

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

    function processUser(foundUser) {
        if (foundUser) {
            const isPasswordValid = bcrypt.compareSync(passwordValue, foundUser.password);

            if (isPasswordValid) {
                message.success('Ви увійшли!');
                addUserToStore(foundUser);
                navigateTheUser(foundUser);
            } else {
                message.error('Ви ввели невірний пароль!');
                form.resetFields(['password']);
            }
        } else {
            message.error('Користувача з таким email та паролем не знайдено. Зареєструйтесь!');
            navigate('/register');
        }
    }

    function checkPasswordValid() {
        if (!isPasswordValid) {
            message.error('Пароль повинен містити щонайменше 6 символів');
            return;
        }
    }

    function handleLogin() {
        checkPasswordValid();

        fetch('http://localhost:8080/api/users')
            .then((response) => response.json())
            .then((users) => {
                const foundUser = users.find((user) => user.email === emailValue);
                processUser(foundUser);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="login-content">
            <Form
                form={form}
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
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
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
                        type="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => {
                            setPasswordValue(e.target.value);
                            setIsPasswordValid(e.target.value.length >= 6);
                        }}
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
