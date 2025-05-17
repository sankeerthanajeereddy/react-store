import React from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Fruits from './fruits';
import Chocolate from './Chocolate';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Cart from './Cart';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Orders from './Orders';

import './mystyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const totalcartcount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signIn'); 
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home"><img src="images/logo.jpg" alt="Logo" style={{ height: '100px' }} /></Link>

        <Link to="/home" className="nav-link">🏠 Home</Link>
        <Link to="/veg" className="nav-link">🥦 Veg</Link>
        <Link to="/nonveg" className="nav-link">🍗 Non-Veg</Link>
        <Link to="/fruits" className="nav-link">🍎 Fruits</Link>
        <Link to="/chocolate" className="nav-link">🍫 Chocolate</Link>
        <Link to="/cart" className="nav-link">🛒 Cart({totalcartcount})</Link>
        <Link to="/Orders" className="nav-link">📦 Orders</Link>
        <Link to="/aboutus" className="nav-link">ℹ About Us</Link>
        <Link to="/contactus" className="nav-link">📞 Contact Us</Link>
        

        {/* 👇 Conditional SignIn / Welcome & Logout */}
        {user ? (
          <>
            <span className="nav-link" style={{color:"pink"}}>👋 Welcome, {user.username}</span>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
          </>
        ) : (
          <Link to="/signIn" className="nav-link">📝 SignIn</Link>
        )}

        
        
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/chocolate" element={<Chocolate />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ContactUs />} />
        <Route path="/category/veg" element={<Veg />} />
<Route path="/category/non-veg" element={<NonVeg />} />
<Route path="/category/fruits" element={<Fruits />} />
<Route path="/category/chocolate" element={<Chocolate />} />

      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
