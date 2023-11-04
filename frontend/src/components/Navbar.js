import { React, useState } from "react";
import { Link } from "react-router-dom";
import { GiShop } from "react-icons/gi";
import Search from "./search";
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Navbar.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [categories, setCategories] = useState([]);
  // Define a state to store the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = () => {
    logout();
  };

  const renderLinksBasedOnUserType = () => {
    if (!user) {
      // User is not logged in
      return (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    }

    // Check if the user object and userType property exist
    if (user && user.userType) {
      switch (user.userType) {
        case "customer":
          return (
            <div>
              <Search /> {/* Include the Search component here */}
              <CategoryDropdown />
              <Link to="/orders">Orders</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              <span>{user.userType}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          );
        case "seller":
          return (
            <div>
              <Link to="/sellerOrders">My orders</Link>
              <span>{user.userType}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          );
        case "admin":
          return (
            <div>
              <span>{user.userType}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          );
      }
    }

    // Default rendering if userType is not available
    return (
      <div>
        <span>{user.email}</span>
        <button onClick={handleClick}>Log out</button>
      </div>
    );
  };

  const getLogoLink = () => {
    if (user) {
      switch (user.userType) {
        case "customer":
          return "/productHome";
        case "seller":
          return "/addProduct";
        case "admin":
          return "/verifySeller";
      }
    }
    return "/";
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link to={getLogoLink()} className="logo">
          <h1>
            <GiShop size={25} /> Shopify
          </h1>
        </Link>
        <nav>{renderLinksBasedOnUserType()}</nav>
      </div>
    </header>
  );
}

export default Navbar;
