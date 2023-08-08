import { useParams } from "react-router-dom";
import React, { createRef, useEffect, useRef, useState } from "react";
import './index.css';
import { getUsers } from "./apiCalls";




function Appointments() {
	let refDate = createRef();
	let refIssue = createRef();
	const [info, setInfo] = useState([]);

	let { id } = useParams();

	async function getUser() {
		fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setInfo(json))
		let doctor = info.filter((doctor, index) => {
			return doctor.id === id;
		})
	}
	
console.log(info)

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
			// doctorId: doctor[0].id,
			// doctorName: doctor[0].fullName,
			// appointmentId: '2',
			// appointmentDate: refDate.current.value,
			// appointmentIssue: refIssue.current.value,
		})
	}


	console.log("doc", doctor);
	return (
		<div className="doctors-appoitments">
			<h1 className="doctors-appoitments__title">Params = {id}</h1>
			<a href="/doctors">return</a>
			{/* <div className="doctors-appoitments__item">
				Name: {doctor[0].name}
			</div>
			<div className="doctors-appoitments__item">
				Email: {doctor[0].email}
			</div> */}
			{/* <div className="doctors-appoitments__item">
				Expirience: {doctor[0].experience} years;
			</div> */}
			{/* <div className="doctors-appoitments__item">
				Previous work place: {doctor[0].previousWorkplace}
			</div> */}
			{/* <div className="doctors-appoitments__item">
				<input type="date" ref={refDate} />
			</div> */}
			<div className="doctors-appoitments__item">
				<textarea name="issue" id="1" ref={refIssue}>

				</textarea>
			</div>
			<button onClick={collectRefs} className="doctors-appoitments__button">Collect</button>
		</div>
	)
}

export default Appointments;
