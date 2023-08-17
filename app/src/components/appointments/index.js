import { useNavigate, useParams } from "react-router-dom";
import React, { createRef, useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar'
import { message } from 'antd';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

function Appointments() {
	//params, variables , ref, state
	let { id } = useParams();
	let navigate = useNavigate();
	let user = JSON.parse(localStorage.getItem('loggedInUser'));
	let userId = user.id;
	let userEmail = user.email;
	let monthArr = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
	let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let refBookingTime = createRef();
	const [info, setInfo] = useState(null);
	const [date, setDate] = useState(null);
	const [appointmentsInfo, setAppointmentsInfo] = useState(null);
	const [bookingTime, setBookingTime] = useState(null);

	function fetchDoctor() {
		fetch('http://localhost:8080/api/doctors')
			.then(response => response.json())
			.then(data => setInfo(data.filter(doctor => doctor.id === +id)))
			.catch((error) => console.log('Error:', error))
	}

	function fetchAppointments() {
		fetch('http://localhost:8080/api/appointments')
			.then(response => response.json())
			.then(data => setAppointmentsInfo(data.filter(appointment => appointment.doctorId === id && appointment.bookingDay === dayNames[date.getDay()] && appointment.bookingMounth === monthArr[date.getMonth()])))
			.catch((error) => message.error('something wrong please contact us by phone'))
	}

	function postAppointment(payload) {
		fetch('http://localhost:8080/api/appointments', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(response => message.success(`You have an appointment to doctor ${info[0].fullName}`))
			.catch((error) => console.log('Error:', error))
	}

	useEffect(() => {
		fetchDoctor();
	}, [id]);

	useEffect(() => {
		if (date) {
			fetchAppointments();
		}
	}, [date]);

	function displayDates() {
		if (date.getDay() > 0 && date.getDay() < 6) {
			let time = ["10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00"]
			let fetchedData = [];
			console.log(appointmentsInfo);
			appointmentsInfo ? appointmentsInfo.map(appointment => fetchedData.push(appointment.bookingTimeRadio)) : console.log(false);
			const commonArray = time.filter(item => !fetchedData.includes(item));
			return commonArray.length === 0 ? 'No time available on this date' : commonArray.map((time, index) => <label key={index} htmlFor={time}><input type="radio" className="bookin-appointmens__time" id={time} key={index} ref={refBookingTime} name="bookingTime" value={time} onClick={(e) => setBookingTime(e.target.value)} /> {time}</label>)
		} else {
			return <p>Day is nt alailable</p>
		}
	}
	
	function doAppointment() {

		let apObj = {
			appointmentId: crypto.randomUUID(),
			bookingTimeInfo: date,
			bookingYear: date.getFullYear(),
			bookingMounth: monthArr[date.getMonth()],
			bookingDay: dayNames[date.getDay()],
			doctorId: id, /// from params
			doctorfullName: info[0].fullName,
			doctorEmail: info[0].email,
			doctorSpeciality: info[0].speciality,
			userEmail: user.email,
			userId: userId, /// should be parsed from json 
			bookingTimeRadio: bookingTime,
		}

		postAppointment(apObj);
		navigate('/home');
	}

	function displayButton() {
		return <div><button className="doctors-appoitments__button button" onClick={doAppointment}>Book Appoitment</button></div>
	}
	
	return (
		info && <div className="doctors-appoitments">
			<h1 className="doctors-appoitments__title text-title">{info[0].fullName}</h1>
			<div className="doctors-appoitments__wrap small-form">
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Speciality:</span> 	<span className="doctors-appoitments__info">{info[0].speciality}</span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Age:</span> 	<span className="doctors-appoitments__info">{info[0].age} years</span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Experience:</span> <span className="doctors-appoitments__info">{info[0].experience} years</span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Email:</span> <span className="doctors-appoitments__info">{info[0].email} </span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Education:</span> <span className="doctors-appoitments__info">{info[0].education} </span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Days:</span> <span className="doctors-appoitments__info">Monday-Friday</span>
				</div>
			</div>
			<Calendar className="doctors-appoitments__calendar"
				dateFormat="dd/mm/yy"
				minDate={new Date()}
				onChange={(e) => setDate(e.target.value)}
				placeholder="choose date"
			/>
			<div className="doctors-appoitments__details_radio">
				{date && displayDates()}
			</div>
			<div className="doctors-appoitments__details">
				{bookingTime && displayButton()}
			</div>
		</div>

	)
}

export default Appointments;
