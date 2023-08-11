import React, { useState } from "react";

const ApplyDoctorForm = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [previousWorkplace, setPreviousWorkplace] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Тут я добавлю код для отправки на сервер
    //  const createDocResponse = await fetch (server,
    //  init:
    //   method: 'POST',
    //   headers: {
    //  *Content- Type': 'application/json'
    //  }
    // body: JSON. stringify (newDoc),
    // H;
    // if (createDocResponse.ok) {
    // message. success ( content: 'Bravo.You successfully apllied as a doctor');
    // navigate('/');
    // } else {
    //  message. error ( content: "Oops , something went wrong , please try again");

    setFullName("");
    setAge("");
    setExperience("");
    setEducation("");
    setPreviousWorkplace("");
    setEmail("");
    setEmailError("");
  };

  const handleFullNameChange = (e) => {
    if (!/\d/.test(e.target.value)) {
      setFullName(e.target.value);
    }
  };

  const handleAgeChange = (e) => {
    if (!isNaN(e.target.value)) {
      setAge(e.target.value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
          required
        />
      </div>

      <div>
        <label htmlFor="experience">Experience:</label>
        <input
          type="text"
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="education">Education:</label>
        <input
          type="text"
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="previousWorkplace">Previous Work Place:</label>
        <input
          type="text"
          id="previousWorkplace"
          value={previousWorkplace}
          onChange={(e) => setPreviousWorkplace(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplyDoctorForm;
