import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { GiShop } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isAddProduct, setIsAddProduct] = useState(true);
  const buttonLabel = isAddProduct ? "Add Product" : "Home";

  const handleClick = () => {
    logout();
  };

  const handleToggle = () => {
    setIsAddProduct(prev => !prev);
    if (!isAddProduct) {
      navigate("/");
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
        <nav>
          {user && (
            <div className="user-info">
              {
                (user.isAdmin = true && (
                  <button className="toggle-button" onClick={handleToggle}>
                    {buttonLabel}
                  </button>
                ))
              }
              <span className="user-email">{user.email}</span>
              <button className="logout-button" onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
