import React, { useState } from "react";
import "./ContactPage.css"; // Import CSS for styling

const ContactPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contact: "",
    email: "",
    queries: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose(); // Close the popup after 2 seconds
    }, 2000);
  };

  return (
    <div className="contact-overlay">
      <div className="contact-popup">
        <button className="close-btn" onClick={onClose}>&times;</button>
        {submitted ? (
          <h2>Thanks for contacting us! We will get back to you soon.</h2>
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
