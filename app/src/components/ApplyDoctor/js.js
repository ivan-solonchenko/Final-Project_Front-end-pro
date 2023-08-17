import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ApplyDoctorForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");
  const [doctors, setDoctors] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((response) => response.json())
      .then((fetchedDoctors) => setDoctors(fetchedDoctors))
      .catch((error) => console.error("Error:", error));
  }, []);

  function createDoctorAndFetch(fullName, email, age, experience, education, speciality) {
    const newDoctorId = doctors.length + 1;

    const newDoctor = {
      id: newDoctorId,
      fullName: fullName,
      email: email,
      age: age,
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
          navigate("/admin"); 
        } else {
          message.error("Failed to submit doctor application");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("An error occurred while submitting the form");
      });
  }

  const handleSubmit = () => {
    const existingDoctor = doctors.find((doctor) => doctor.email === form.getFieldValue("email"));

    if (existingDoctor) {
      message.error("This email is already in use");
    } else {
      createDoctorAndFetch(
        form.getFieldValue("fullName"),
        form.getFieldValue("email"),
        form.getFieldValue("age"),
        form.getFieldValue("experience"),
        form.getFieldValue("education"),
        form.getFieldValue("speciality")
      );
    }
  };

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
        <Input className="apply-doctor-input" />
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
        <Input className="apply-doctor-input" type="number" />
      </Form.Item>

      <Form.Item
        label="Experience"
        name="experience"
        rules={[{ required: true, message: "Please enter your experience" }]}
        className="apply-doctor-label"
      >
        <Input className="apply-doctor-input" />
      </Form.Item>

      <Form.Item
        label="Education"
        name="education"
        rules={[{ required: true, message: "Please enter your education" }]}
        className="apply-doctor-label"
      >
        <Input className="apply-doctor-input" />
      </Form.Item>

      <Form.Item
        label="Speciality"
        name="speciality"
        rules={[
          { required: true, message: "Please enter your speciality" },
        ]}
        className="apply-doctor-label"
      >
        <Input className="apply-doctor-input" />
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
        <Input className="apply-doctor-input" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="apply-doctor-button">
          <p className="apply-doctor-submit">Submit</p>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplyDoctorForm;
