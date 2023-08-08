import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Login() {
    const navigate = useNavigate();
    const localPath = 'https://jsonplaceholder.typicode.com/users';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const onFinish = () => {
        fetch(localPath)
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(user => user.email === formData.email && user.username === formData.password);

                if (foundUser) {
                    message.success('Ви увійшли!');
                    localStorage.setItem('loggedInUser', JSON.stringify(formData));
                    navigate('/home');
                    clearFields()
                } else {
                    message.error('Користувача з таким email та паролем не знайдено. Зареєструйтесь!');
                    navigate('/register');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const clearFields = () => {
        formData.email = ''
        formData.password = ''
    };


    return (
        <div className="login-content">
            <Form layout="vertical" className="login-form">
                <h2 className="login-form-title">Вхід
                    <hr />
                </h2>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Будь ласка, введіть email' }]}>
                    <Input type="email"  name="email" value={formData.email} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}>
                    <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </Form.Item>
                <button onClick={onFinish} className="login-button" type="submit">
                    Увійти
                </button>
                <Link to="/register">
                    Не маєте облікового запису? <strong>Зареєструватися</strong>
                </Link>
            </Form>
        </div>
    );
}

export default Login;