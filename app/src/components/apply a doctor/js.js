import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";

const { Text } = Typography;

const ApplyDoctorForm = () => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (values) => {
    if (!validateEmail(values.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      // Add your server API call logic here
      // Example:
      // const response = await fetch(server, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });
      // if (response.ok) {
      //   message.success('Bravo. You successfully applied as a doctor');
      //   form.resetFields();
      // } else {
      //   message.error('Oops, something went wrong. Please try again');
      // }
    } catch (error) {
      message.error('Oops, something went wrong. Please try again');
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailError(validateEmail(email) ? "" : "Please enter a valid email address.");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          { required: true, message: "Please enter your age" },
          { type: "number", message: "Please enter a valid number" },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Experience"
        name="experience"
        rules={[{ required: true, message: "Please enter your experience" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Education"
        name="education"
        rules={[{ required: true, message: "Please enter your education" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Previous Work Place"
        name="previousWorkplace"
        rules={[{ required: true, message: "Please enter your previous workplace" }]}
      >
        <Input />
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
        <Input onChange={handleEmailChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplyDoctorForm;
