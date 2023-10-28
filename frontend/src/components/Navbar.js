import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { GiShop } from "react-icons/gi";
import { useState } from "react";
import AddProduct from "../pages/Seller/addProduct";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isAddProduct, setIsAddProduct] = useState(true);
  const buttonLabel = isAddProduct ? "Add Product" : "Home";

  const handleClick = () => {
    logout();
  };

  // const handleToggle = () => {
  //   setIsAddProduct(prev => !prev);
  //   if (!isAddProduct) {
  //     navigate("/");
  //   }
  // };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            <GiShop size={25} /> Shopify
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              {/* <Link to="/addProduct">Add Products</Link> */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
