import { useParams } from "react-router-dom";
import React, { createRef, useEffect, useState } from "react";

import './index.css';




function Appointments() {
	let refDate = createRef();
	let refIssue = createRef();
	const [info, setInfo] = useState(null);

	let { id } = useParams();
	console.log(id)

	 async function getUser() {
		
			const response = await fetch('https://jsonplaceholder.typicode.com/users')
			const data =  await response.json();
			setInfo(data.filter( user => user.id === +id))

		
	}


	useEffect(() => {
		getUser();
	}, [id]);

	let user = {
		id: 25,
		name: 'Artem',
	}

	// let doctor = info.filter((doctor, index) => {
	// 	return doctor.id === 1;
	// })
	user.appointment = [

	]
	function collectRefs() {
		user.appointment.push({
			doctorId: info[0].id,
			doctorName: info[0].name,
			// appointmentId: '2',
			// appointmentDate: refDate.current.value,
			// appointmentIssue: refIssue.current.value,
		})
	}
	console.log(info)
	return (
		info &&	<div className="doctors-appoitments">
			<h1 className="doctors-appoitments__title">Params = {id}</h1>
			<a href="/doctors">return</a>
			<div className="doctors-appoitments__item">
				Name: {info[0].name }
			</div>
			<div className="doctors-appoitments__item">
				Email: {info[0].email}
			</div>
			<div className="doctors-appoitments__item">
				Expirience: {info[0].address.city} years;
			</div>
			<input type="date" ref={refDate}/>

			<div className="doctors-appoitments__item">
				<textarea name="issue" id="1" ref={refIssue}>

				</textarea>
			</div>
			<button onClick={collectRefs} className="doctors-appoitments__button" >Collect</button>
		</div>
	)
}

export default Appointments;
// import { Form, Input } from 'antd';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { message } from 'antd';

// function Login() {
//     const navigate = useNavigate();
//     const localPath = 'https://jsonplaceholder.typicode.com/users';

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const onFinish = () => {
//         fetch(localPath)
//             .then(response => response.json())
//             .then(users => {
//                 const foundUser = users.find(user => user.email === formData.email && user.username === formData.password);

//                 if (foundUser) {
//                     message.success('Ви увійшли!');
//                     localStorage.setItem('loggedInUser', JSON.stringify(formData));
//                     navigate('/home');
//                     clearFields()
//                 } else {
//                     message.error('Користувача з таким email та паролем не знайдено. Зареєструйтесь!');
//                     navigate('/register');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     };

//     const handleInputChange = e => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const clearFields = () => {
//         formData.email = ''
//         formData.password = ''
//     };


//     return (
//         <div className="login-content">
//             <Form layout="vertical" className="login-form">
//                 <h2 className="login-form-title">Вхід
//                     <hr />
//                 </h2>
//                 <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Будь ласка, введіть email' }]}>
//                     <Input type="email"  name="email" value={formData.email} onChange={handleInputChange} />
//                 </Form.Item>
//                 <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}>
//                     <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
//                 </Form.Item>
//                 <button onClick={onFinish} className="login-button" type="submit">
//                     Увійти
//                 </button>
//                 <Link to="/register">
//                     Не маєте облікового запису? <strong>Зареєструватися</strong>
//                 </Link>
//             </Form>
//         </div>
//     );
// }

// export default Login;