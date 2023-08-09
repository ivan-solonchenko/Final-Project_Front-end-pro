import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Register() {
    const navigate = useNavigate()
    const server = 'https://jsonplaceholder.typicode.com/users';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onFinish = () => {
        fetch(server)
            .then(response => response.json())
            .then(users => {
                const existingUser = users.find(user => user.email === formData.email);

                if (existingUser) {
                    message.error("Користувач з такою поштою вже існує");
                } else {
                    const newUserId = users.length + 1;
                    const newUser = { id: newUserId, ...formData };
                    users.push(newUser);

                    return fetch(server, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(users),
                    });
                }
            })
            .then(response => {
                if (response && response.ok) {
                    message.success('Вітаємо! Ви успішно зареєструвались.');
                    navigate('/');
                } else {
                    message.error("Не вдалося зареєструватись. Спробуйте ще раз");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div className="login-content">
            <Form layout="vertical" className="login-form" onFinish={onFinish}>

                <h2 className="login-form-title">Реєстрація
                    <hr />
                </h2>

                <Form.Item label="Ім'я"  name="name" rules={[{ required: true, message: 'Будь ласка, введіть ваше ім\'я' }]}>
                    <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Будь ласка, введіть email' }]}>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}>
                    <Input.Password type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </Form.Item>

                <button className="login-button" type="submit">Зареєструватися</button>

                <Link to='/'>
                    Вже є обліковий запис. <strong>Увійти</strong>
                </Link>
            </Form>
        </div>
    )
}

export default Register;
