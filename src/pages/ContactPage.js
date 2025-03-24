import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

const ContactPage = () => { // ✅ Removed `onClose` since it's unnecessary now
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contact: "",
    email: "",
    queries: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "sharktankindia",
        "template_l45mrmo",
        formData,
        "yjzrT5cMij8f0HpL6"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitted(true);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const handleClose = () => {
    navigate("/"); // ✅ Always navigate to home page on close
  };

  return (
    <div className="contact-overlay">
      <div className="contact-popup">
        <button className="close-btn" onClick={handleClose}>&times;</button>
        {submitted ? (
          <>
            <h2>Thanks for contacting us! We will get back to you soon.</h2>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Country:</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />

            <label>Contact:</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

            <label>Email ID:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Queries:</label>
            <textarea name="queries" value={formData.queries} onChange={handleChange} required></textarea>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
