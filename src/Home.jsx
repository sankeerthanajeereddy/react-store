import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Top Banner */}
      <section className="banner-section">
        <div className="banner-overlay">
          <div className="banner-content">
            <h1>Welcome to FamilyMart</h1>
            <p>Fresh. Fast. Delivered.</p>
            <button onClick={() => navigate("/explore")}>Start Shopping 🛒</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => navigate("/category/veg")}>
            <img src="/images/vegtables.jpg" alt="Vegetarian" />
            <h3>Vegetarian</h3>
          </div>
          <div className="category-card" onClick={() => navigate("/category/non-veg")}>
            <img src="/images/nonveg.jpg" alt="Non-Veg" />
            <h3>Non-Vegetarian</h3>
          </div>
          <div className="category-card" onClick={() => navigate("/category/fruits")}>
            <img src="/images/fruits.jpg" alt="Fruits" />
            <h3>Fruits</h3>
          </div>
          <div className="category-card" onClick={() => navigate("/category/chocolate")}>
            <img src="/images/chocolate.jpg" alt="Chocolate" />
            <h3>Chocolate</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Best Sellers</h2>
        <div className="product-grid">
          {[
            { name: "5 star", img: "/images/5star.jpg", price: "₹80" },
            { name: "Grapes", img: "/images/grapes.jpg", price: "₹120" },
            { name: "Organic Chicken", img: "/images/chickens.jpg", price: "₹220" },
            { name: "Cabbage", img: "/images/cabbages.jpg", price: "₹60" },
          ].map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt={item.name} />
              <div className="product-info">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section">
        <img src="/assets/offer-banner.jpg" alt="Offers" className="promo-banner" />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/support">Support</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        <p>© 2025 FamilyMart. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
