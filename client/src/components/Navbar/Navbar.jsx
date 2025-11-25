import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* ✅ Logo */}
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Logo" />
      </Link>

      {/* ✅ Navigation Menu */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>

        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("Mobile-app")}
            className={menu === "Mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
        </li>

        <li>
          <a
            href="#footer"
            onClick={() => setMenu("Contact-us")}
            className={menu === "Contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* ✅ Right Section */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="icon" />

        {/* Cart Icon with Dot */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>

          {/* ✅ Show red dot if cart amount > 0 */}
          {typeof getTotalCartAmount === "function" &&
            getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {/* ✅ Auth Section — fixed condition */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="signin-btn">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
