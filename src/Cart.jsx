import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearcart,
  addOrder,
} from "./store";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import"./chocolate.css";

function CartComponent() {
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const taxPercentage = 5;
  const couponCodeRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleDiscountClick = (percentage) => {
    setAppliedDiscount(percentage);
    toast.success(`Applied ${percentage}% discount`);
  };

  const handleCouponPer = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(code);
    switch (code) {
      case "DUSSERA10":
        setCouponCodeDiscountPer(10);
        toast.success("DUSSERA10 coupon applied!");
        break;
      case "DIWALI20":
        setCouponCodeDiscountPer(20);
        toast.success("DIWALI20 coupon applied!");
        break;
      case "PONGAL30":
        setCouponCodeDiscountPer(30);
        toast.success("PONGAL30 coupon applied!");
        break;
      default:
        setCouponCodeDiscountPer(0);
        toast.error("Invalid Coupon Code");
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (totalPrice * appliedDiscount) / 100;
  const couponAmount = (totalPrice * couponCodeDiscountPer) / 100;
  const tax = ((totalPrice - discountAmount - couponAmount) * taxPercentage) / 100;
  const finalAmount = totalPrice - discountAmount - couponAmount + tax;

  const fireConfettiContinuously = (duration = 3000) => {
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      confetti({
        ...defaults,
        particleCount: 30,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ["#ff6b6b", "#6bc5ff", "#ffd93b", "#6eff6e", "#c77dff"],
        shapes: ["circle", "square"],
      });

      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 250);
  };

  const handleCompletePurchase = () => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: finalAmount.toFixed(2),
    };

    const templateParams = {
      order_id: order.id,
      orders: cartItems.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
      })),
      cost: {
        shipping: 50,
        tax: tax.toFixed(2),
        total: finalAmount.toFixed(2),
      },
      email: customerEmail,
    };

    emailjs
      .send(
        "service_shvqq99",
        "template_dd0801p",
        templateParams,
        "KRVIanpdfT1QijGY5"
      )
      .then(() => console.log("✅ Email sent successfully"))
      .catch((error) => console.error("❌ Email sending failed:", error));

    dispatch(addOrder(order));
    dispatch(clearcart());
    setPurchaseCompleted(true);
    setAppliedDiscount(0);
    setCouponCodeDiscountPer(0);
    setCouponName("");
    if (couponCodeRef.current) couponCodeRef.current.value = "";

    let countdown = 3;
    setRedirectCountdown(countdown);
    fireConfettiContinuously(3000);

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      setRedirectCountdown(countdown);
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        navigate("/Orders");
      }
    }, 1000);
  };

  const handleCardPayment = () => {
    if (
      cardDetails.cardNumber.length < 12 ||
      cardDetails.expiryDate.length < 4 ||
      cardDetails.cvv.length < 3
    ) {
      toast.error("Please enter valid card details.");
      return;
    }
    toast.success("💳 Payment Successful!");
    handleCompletePurchase();
  };

  const renderedCartItems = cartItems.map((item) => (
    <li key={item.name} className="cart-item">
      <img src={item.image} width={50} alt={item.name} />
      <span>
        <strong>{item.name}</strong> — ₹{item.price} × {item.quantity}
      </span>
      <span>
        <button
          className="btn-increment"
          onClick={() => {
            dispatch(incrementQuantity(item.name));
            toast.info(`Increased quantity of ${item.name}`);
          }}
        >
          +
        </button>
        <button
          className="btn-decrement"
          onClick={() => {
            dispatch(decrementQuantity(item.name));
            toast.info(`Decreased quantity of ${item.name}`);
          }}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <button
          className="btn-remove"
          onClick={() => {
            dispatch(removeItem(item.name));
            toast.warn(`${item.name} removed from cart`);
          }}
        >
          Remove
        </button>
      </span>
    </li>
  ));

  if (purchaseCompleted) {
    return (
      <div className="purchase-message-container">
        <ToastContainer />
        <h2 className="purchase-message">
          🎉 Purchase completed! Redirecting in {redirectCountdown}...
        </h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <ToastContainer position="top-center" />
      <div className="cart-left">
        <h1>Your Cart</h1>
        <ol className="cart-list">{renderedCartItems}</ol>

        <div className="discount-buttons">
          <button className="btn-discount-10" onClick={() => handleDiscountClick(10)}>10% Discount</button>
          <button className="btn-discount-20" onClick={() => handleDiscountClick(20)}>20% Discount</button>
          <button className="btn-discount-30" onClick={() => handleDiscountClick(30)}>30% Discount</button>
        </div>

        <div className="coupon-section">
          <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
          <button onClick={handleCouponPer}>Apply Coupon</button>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter your Gmail to receive order confirmation</label>
          <input
            type="email"
            ref={emailRef}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="form-control"
            placeholder="you@example.com"
          />
        </div>

        <div className="payment-options">
          <h3>Select Payment Method</h3>
          <button onClick={() => setPaymentMethod("qr")}>📱 Pay with QR</button>
          <button onClick={() => setPaymentMethod("card")}>💳 Pay with Card</button>
        </div>

        {paymentMethod === "qr" && (
          <div className="qr-section">
            <h4>Scan UPI QR to pay ₹{finalAmount.toFixed(2)}</h4>
            <QRCode
              value={`upi://pay?pa=9346707115@ybl&pn=SankeerthanaStore&am=${finalAmount.toFixed(2)}&cu=INR`}
            />
            <p>UPI ID: 9346707115@upi</p>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="card-payment-box">
            <h3>Enter Card Details</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
              <button type="button" onClick={handleCardPayment}>
                ✅ Pay with Card
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="cart-right">
        <h1>Order Summary</h1>
        <p>Total Items: {cartCount}</p>
        <p>Total Amount: ₹{totalPrice.toFixed(2)}</p>
        <p>Discount ({appliedDiscount}%): -₹{discountAmount.toFixed(2)}</p>
        <p>
          Coupon {couponName} ({couponCodeDiscountPer}%): -₹{couponAmount.toFixed(2)}
        </p>
        <p>Tax ({taxPercentage}%): +₹{tax.toFixed(2)}</p>
        <p><strong>Final Amount: ₹{finalAmount.toFixed(2)}</strong></p>
        {paymentMethod === "" && (
          <p style={{ color: "red" }}>⚠️ Select a payment method to proceed.</p>
        )}
        {paymentMethod !== "" && (
          <div className="final-purchase-btn">
            <button className="complete-purchase-btn" onClick={handleCompletePurchase}>
              🛒 Complete Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartComponent;
