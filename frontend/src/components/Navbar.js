import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { GiShop } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  // Define the links based on the user's userType
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

    // User is logged in, render links based on userType
    switch (user.userType) {
      case "customer":
        return (
          <div>
            <Link to="/productHome">Product Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <span>{user.userType}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        );
      case "seller":
        return (
          <div>
            <Link to="/addProduct">Add Product</Link>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        );
      case "admin":
        return (
          <div>
            <Link to="/verifySeller">Verify Seller</Link>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        );
      default:
        return (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        );
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <h1>
            <GiShop size={25} /> Shopify
          </h1>
        </Link>
        <nav>{renderLinksBasedOnUserType()}</nav>
      </div>
    </header>
  );
};

export default Navbar;
