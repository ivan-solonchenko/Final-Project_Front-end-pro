import { useNavigate, useParams } from "react-router-dom";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Calendar } from 'primereact/calendar'
import { message } from 'antd';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

function Appointments() {
	//params, variables , ref, state
	let { id } = useParams();
	let navigate = useNavigate();
	let defaulDate = new Date();
	let user = JSON.parse(localStorage.getItem('loggedInUser'));
	let userId = user.email
	let refBookingTime = createRef();
	let refIssue = createRef();
	const [info, setInfo] = useState(null);
	const [date, setDate] = useState(null);
	const [appointmentsInfo, setAppointmentsInfo] = useState(null);
	const [bookingTime, setBookingTime] = useState(null);
	const [weekDay, setWeekDay] = useState(defaulDate.getDay());
	const [appointmentData, setAppointmentData] = useState(null)
	function fetchDoctor() {
		fetch('http://localhost:8080/api/doctors')
			.then(response => response.json())
			.then(data => setInfo(data.filter(doctor => doctor.id === +id)))
			.catch((error) => console.log('Error:', error))
	}

	function fetchAppointments() {
		fetch('http://localhost:8080/api/appointments')
			.then(response => response.json())
			.then(data => setAppointmentsInfo(data.filter(appointment => appointment.userId === userId && appointment.doctorId === id && appointment.bookingDay === date.getDay() && appointment.bookingMounth === date.getMonth())))
			.catch((error) => message.error('щось пішло не так'))
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
			.then(data => console.log(data))
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
			appointmentsInfo ? appointmentsInfo.map(appointment => fetchedData.push(appointment.bookingTimeRadio)) : console.log(false);
			const commonArray = time.filter(item => !fetchedData.includes(item));
			return commonArray.map((time, index) => <label for={time}><input type="radio" className="bookin-appointmens__time" id={time} key={index} ref={refBookingTime} name="bookingTime" value={time} onClick={(e) => setBookingTime(e.target.value)} /> {time}</label>)
		} else {
			return <p>Day is nt alailable</p>
		}
	}
	console.log(appointmentsInfo);
	console.log();
	function doAppointment() {
		let apObj = {
			appointmentId: crypto.randomUUID(),
			bookingTimeInfo: date,
			bookingYear: date.getFullYear(),
			bookingMounth: date.getMonth(),
			bookingDay: date.getDay(),
			userId: userId, /// should be parsed from json 
			doctorId: id, /// from params
			bookingTimeRadio: bookingTime,
		}
		postAppointment(apObj);

		navigate('/doctors');
	}

	function displayButton() {
		return <div><button className="doctors-appoitments__button button-15" onClick={doAppointment}>Book Appoitment</button></div>
	}
	return (

		info && <div className="doctors-appoitments">
			<a href="/doctors">return</a>
			<h1 className="doctors-appoitments__title text-title">Params = {id} {info[0].Name}</h1>
			<div className="doctors-appoitments__wrap small-form">
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Age:</span> 	<span className="doctors-appoitments__info">{info[0].id}</span>
				</div>
				<div className="doctors-appoitments__item">
					<span className="doctors-appoitments__text">Expirience:</span> <span className="doctors-appoitments__info">{info[0].Age} years</span>
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
			<div className="doctors-appoitments__details">
				{date && displayDates()}
			</div>
			<div className="doctors-appoitments__details">
				{bookingTime && displayButton()}
			</div>
		</div>

	)
}

export default Appointments;
