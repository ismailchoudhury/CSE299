import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Cart = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      fetch("/api/cart/get-cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user.Id}),
      })
        .then(response => response.json())
        .then(data => {
          setCart(data.userCart);
        })
        .catch(error => {
          console.error("Error fetching cart:", error);
        });
    };
    console.log(fetchCart);
    fetchCart();
  }, []);

  return (
    <div className="cart-page">
      <h1>Cart</h1>(
      <ul>
        {cart.map(item => (
          <li key={item._id} className="cart-item">
            {/* Display cart item information here */}
            <p>Product ID: {item.product._id}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      )
    </div>
  );
};

export default Cart;
