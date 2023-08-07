import React, { useState } from "react";

const ApplyDoctorForm = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [previousWorkplace, setPreviousWorkplace] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // тут я добавлю код для отправки на сервер потом как-то

    //  localstorage.getitem(user)

    setFullName("");
    setAge("");
    setExperience("");
    setEducation("");
    setPreviousWorkplace("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplyDoctorForm;
