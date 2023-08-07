import { useParams } from "react-router-dom"
import React, { useRef, useState } from "react";
import './index.css'
function Appointments() {
	let refDate = useRef();
	let refIssue = useRef();

	let { id } = useParams();

	const doctors = [
		{ id: '1', fullName: 'doctor1', age: '33', experience: '5', previousWorkplace: 'none' },
		{ id: '2', fullName: 'doctor2', age: '43', experience: '6', previousWorkplace: 'none' },
		{ id: '3', fullName: 'doctor3', age: '53', experience: '15', previousWorkplace: 'none' },
		{ id: '4', fullName: 'doctor4', age: '63', experience: '25', previousWorkplace: 'none' },
		{ id: '5', fullName: 'doctor5', age: '73', experience: '35', previousWorkplace: 'none' },
	]
	let user = {
		id: 25,
		name: 'Artem',

	}

	let doctor = doctors.filter((doctor, index) => {
		return doctor.id === id;
	})
	user.appointment = [

	]
	function collectRefs() {
		user.appointment.push({
			doctorId: doctor[0].id,
			doctorName: doctor[0].fullName,
			appointmentId: '2',
			appointmentDate: refDate.current.value,
			appointmentIssue: refIssue.current.value,
		})

		console.log(user);
	}


	return (
		<div className="doctors-appoitments">
			<h1 className="doctors-appoitments__title">Params = {id}</h1>
			<a href="/doctors">return</a>
			<div className="doctors-appoitments__item">
				Name: {doctor[0].fullName}
			</div>
			<div className="doctors-appoitments__item">
				Age: {doctor[0].age}
			</div>
			<div className="doctors-appoitments__item">
				Expirience: {doctor[0].experience} years;
			</div>
			<div className="doctors-appoitments__item">
				Previous work place: {doctor[0].previousWorkplace}
			</div>
			<div className="doctors-appoitments__item">
				<input type="date" ref={refDate} />
			</div>
			<div className="doctors-appoitments__item">
				<textarea name="issue" id="" ref={refIssue}>

				</textarea>
			</div>
			<button onClick={collectRefs} className="doctors-appoitments__button">Collect</button>
		</div>
	)
}

export default Appointments;
