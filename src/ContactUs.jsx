import React, { useState } from "react";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Thank you for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.contactInfo}>
        <h2 style={styles.heading}>Get in Touch</h2>
        <p style={styles.info}><span style={styles.icon}>📞</span> +1 234 567 8901</p>
        <p style={styles.info}><span style={styles.icon}>📧</span> contact@family supermarket.com</p>
        <p style={styles.info}><span style={styles.icon}>📍</span> 123 Foodie Street, Flavor Town</p>
        <p style={styles.description}>
          We’re here to help! Whether it’s a question about an order or just feedback, feel free to reach out.
        </p>
      </div>

      <div style={styles.contactForm}>
        <h2 style={styles.formHeading}>Send Us a Message</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Send Message ✉️</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  contactInfo: {
    flex: "1",
    backgroundColor: "#e0f7fa",
    padding: "40px",
    color: "#00796b",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  info: {
    fontSize: "16px",
    margin: "10px 0",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  description: {
    marginTop: "20px",
    lineHeight: "1.6",
  },
  contactForm: {
    flex: "1",
    padding: "40px",
    backgroundColor: "#ffffff",
  },
  formHeading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "12px",
    height: "120px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#00acc1",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ContactUs;