import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import "./index.css";

 //const { Text } = Typography;

const ApplyDoctorForm = () => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((response) => response.json())
      .then((fetchedDoctors) => setDoctors(fetchedDoctors))
      .catch((error) => console.error("Error:", error));
  }, []);

  function handleSubmit() {
    const existingDoctor = doctors.find((doctor) => doctor.email === email);

    if (existingDoctor) {
      message.error("This email is already in use ");
      return;
    } else {
      return createDoctorAndFetch(fullName, email);
    } 
  }

  function createDoctorAndFetch(name, email) {
    const newDoctorId = doctors.length + 1;

    const newDoctor = {
      id: newDoctorId, 
      fullName: fullName ,
    age: age ,
    email: email,
    experience: experience,
    education: education ,
    speciality: speciality ,  
    };

    return fetch("http://localhost:8080/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDoctor),
    });
  }

  return (
    <Form form={form} onFinish={handleSubmit} className="apply-doctor-form">
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input
          onChange={(e) => setFullName(e.target.value)}
          className="apply-doctor-input"
        />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          { required: true, message: "Please enter your age" },
          { type: "number", message: "Please enter a valid number" },
        ]}
      >
        <Input
          onChange={(e) => setAge(e.target.value)}
          className="apply-doctor-input"
          type="number"
        />
      </Form.Item>

      <Form.Item
        label="Experience"
        name="experience"
        rules={[{ required: true, message: "Please enter your experience" }]}
      >
        <Input
          onChange={(e) => setExperience(e.target.value)}
          className="apply-doctor-input"
        />
      </Form.Item>

      <Form.Item
        label="Education"
        name="education"
        rules={[{ required: true, message: "Please enter your education" }]}
      >
        <Input
          onChange={(e) => setEducation(e.target.value)}
          className="apply-doctor-input"
        />
      </Form.Item>

      <Form.Item
        label="Speciality"
        name="swpeciality"
        rules={[
          { required: true, message: "Please enter your previous workplace" },
        ]}
      >
        <Input
          onChange={(e) => setSpeciality(e.target.value)}
          className="apply-doctor-input"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
        validateStatus={emailError ? "error" : ""}
        help={emailError}
      >
        <Input
          className="apply-doctor-input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="apply-doctor-button"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplyDoctorForm;
