import { useParams } from "react-router-dom";
import React, { createRef, useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar'
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

function Appointments() {
	//params, variables , ref, state
	let { id } = useParams();
	let defaulDate = new Date();
	let refBookingTime = createRef();
	let refIssue = createRef();
	const [info, setInfo] = useState(null);
	const [date, setDate] = useState(null);
	const [bookingTime, setBookingTime] = useState(null);
	const [weekDay, setWeekDay] = useState(defaulDate.getDay());

	async function fetchDoctor() {
		const response = await fetch('http://localhost:8080/api/doctors')
		const data = await response.json();
		setInfo(data.filter(doctor => doctor.id === +id))
	}

	useEffect(() => {
		fetchDoctor();
	}, [id]);

	function displayDates() {
		if (date.getDay() > 0 && date.getDay() < 6) {
			let time = ["10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00"]
			return time.map((time, index) => <label for={time}><input type="radio" className="bookin-appointmens__time" id={time} key={index} ref={refBookingTime} name="bookingTime" value={time} onClick={(e) => setBookingTime(e.target.value)} /> {time}</label>)
		} else {
			return <p> day is nt alailable</p>
		}
	}

	function displayButton() {
		return <div><button className="doctors-appoitments__button button-15" >Collect</button></div>
	}
	return (

		info && <div className="doctors-appoitments">
			<a href="/doctors">return</a>
			<h1 className="doctors-appoitments__title">Params = {id} {info[0].Name}</h1>
			<div className="doctors-appoitments__wrap">
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
