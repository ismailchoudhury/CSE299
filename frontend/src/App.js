import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// pages & components
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/Seller/addProduct";
import SellerList from "./pages/Admin/verifySeller";
import ProductHome from "./pages/productHome/productHome";
import Cart from "./pages/Cart/cart";
import Wishlist from "./pages/wishlist/wishlist";
import Orders from "./pages/orders/orders";
import Checkout from "./pages/Checkout/checkout";
import SearchResults from "./pages/searchResults";
function App() {
  // Use the useAuthContext hook to access the user info
  const user = JSON.parse(localStorage.getItem("user"));
  let usert;
  if (user) {
    const { userType } = user;
    usert = userType;
  }
  // let conditionalRedirect = null;

  // if (user && usert) {
  //   conditionalRedirect = <Route to="/addProduct" />;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/addProduct" element={<AddProduct />} />;
          <Route path="/verifySeller" element={<SellerList />} />
          <Route path="/productHome" element={<ProductHome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/searchResults" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
