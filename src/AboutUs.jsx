import React from "react";
import "./AboutUs.css";


function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About FamilyMart</h1>
          <p>Your trusted online grocery partner.</p>
        </div>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          FamilyMart is your one-stop destination for fresh groceries, household essentials,
          and daily needs delivered straight to your doorstep. With a focus on quality,
          convenience, and speed, we aim to make your shopping experience delightful.
        </p>

        <h2>Our Mission</h2>
        <p>
          To bring fresh, affordable, and quality groceries to every home with unmatched convenience.
          We partner with local farmers and trusted brands to deliver freshness and value.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Wide selection of fresh produce and daily essentials</li>
          <li>✅ Fast and reliable delivery</li>
          <li>✅ Secure payments and easy returns</li>
          <li>✅ Friendly customer support</li>
        </ul>

        <div className="about-team">
          <h2>Meet Our Team</h2>
          <p>We're a passionate crew dedicated to bringing the best groceries to your doorstep.</p>
          <img src="/assets/team.jpg" alt="Our Team" />
        </div>
      </section>

      <footer className="about-footer">
        <p>© 2025 FamilyMart. Built with ❤️ for our community.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
