import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { GiShop } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  const handleSearch = () => {
    console.log(searchQuery);

    fetch(`/api/products/search?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        setSearchItem(data);
        setShowResults(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const hideResults = () => {
    setShowResults(false);
  };

  const handleSearchResultClick = result => {
    navigate("/searchResults", { state: { searchResults: [result] } });
  };

  const renderSearchResults = () => {
    if (showResults && searchItem.length > 0) {
      return (
        <div className="search-results">
          <ul>
            {searchItem.map((result, index) => (
              <li key={index} onClick={() => handleSearchResultClick(result)}>
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
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

    // User is logged in, render links based on userType
    switch (user.userType) {
      case "customer":
        return (
          <div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Link to={"/search"}>
                <button onClick={handleSearch}>Search</button>
              </Link>
            </div>
            <Link to="/productHome">Product Home</Link>
            <Link to="/orders">Orders</Link> {/* Add Orders button */}
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
    <div>
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
    </div>
  );
};

export default Navbar;
