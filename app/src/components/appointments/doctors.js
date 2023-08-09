function Doctors() {

	const doctors = [
		{ id: '1', fullName: 'doctor1', age: '33', experience: '5', previousWorkplace: 'none' },
		{ id: '2', fullName: 'doctor2', age: '43', experience: '6', previousWorkplace: 'none' },
		{ id: '3', fullName: 'doctor3', age: '53', experience: '15', previousWorkplace: 'none' },
		{ id: '4', fullName: 'doctor4', age: '63', experience: '25', previousWorkplace: 'none' },
		{ id: '5', fullName: 'doctor5', age: '73', experience: '35', previousWorkplace: 'none' },
	]

	return (

		<div>
			<h1>Doctors Page</h1>
			{doctors.map((doctor, index) => {
				return <div>
					<a href={`/appointments/${doctor.id}`}>{doctor.fullName}
					</a>
				</div>
			})}
		</div>

	)
}

export default Doctors;