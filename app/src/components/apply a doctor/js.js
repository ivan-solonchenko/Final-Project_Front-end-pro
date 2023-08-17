import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ApplyDoctorForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
        console.log(loggedInUser.role);
      }
    }
  }, [navigate]);

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
      message.error("This email is already in use");
      return;
    } else {
      createDoctorAndFetch(fullName, email);
    }
  }

  function createDoctorAndFetch(fullName, email) {
    const newDoctorId = doctors.length + 1;

    const newDoctor = {
      id: newDoctorId,
      fullName: fullName,
      age: age,
      email: email,
      experience: experience,
      education: education,
      speciality: speciality,
    };

    fetch("http://localhost:8080/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDoctor),
    })
      .then((response) => {
        if (response.ok) {
          message.success("Doctor application submitted successfully");
          form.resetFields();
          navigate("шлях куди має перейти після запонення поля");
        } else {
          message.error("Failed to submit doctor application");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("An error occurred while submitting the form");
      });
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="apply-doctor-form"
      layout="vertical"
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
        className="apply-doctor-label"
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
          { type: "string", message: "Please enter a valid number" },
        ]}
        className="apply-doctor-label"
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
        className="apply-doctor-label"
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
        className="apply-doctor-label"
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
        className="apply-doctor-label"
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
        className="apply-doctor-label"
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
        > <p className="apply-doctor-submit">Submit</p>
          
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplyDoctorForm;
