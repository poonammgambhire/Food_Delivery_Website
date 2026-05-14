import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Logo" />
      </Link>

      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>
            Menu
          </a>
        </li>
        <li>
          <a href="#app-download" onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>
            Mobile App
          </a>
        </li>
        <li>
          <a href="#footer" onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>
            Contact Us
          </a>
        </li>
        <li>
          
            href="https://food-delivery-website-rlohhl5o8-poonam-gambhire-s-projects.vercel.app"
            target="_blank"
            onClick={() => setMenu("Admin")}
            className={menu === "Admin" ? "active" : ""}
          >
            Admin Panel
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          {typeof getTotalCartAmount === "function" && getTotalCartAmount() > 0 && (
            <div className="dot"></div>
          )}
        </div>
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
