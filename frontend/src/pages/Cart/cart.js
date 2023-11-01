import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./cart.css";

const Cart = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(`/api/cart/get-cart/${user.Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCart(data.userCart);
      } else {
        console.error("Error fetching cart:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrement = async productId => {
    const response = await fetch(`/api/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.Id,
        productId: productId,
      }),
    });

    if (response.ok) {
      fetchCart();
    }
  };

  const handleDecrement = async productId => {
    const response = await fetch(`/api/cart/remove-from-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.Id,
        productId: productId,
      }),
    });

    if (response.ok) {
      fetchCart();
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="cart-container">
          <p className="total-amount">Total Amount: ৳{calculateTotal()}</p>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item._id} className="cart-item">
                <img
                  src={item.product.imgURL}
                  alt={item.product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <p className="product-name">{item.product.name}</p>
                  <p className="product-price">৳{item.product.price}</p>
                </div>
                <p className="product-quantity">Quantity: {item.quantity}</p>
                <div className="product-actions">
                  <button
                    className="action-button increment-button"
                    onClick={() => handleIncrement(item.product._id)}
                  >
                    +
                  </button>
                  <button
                    className="action-button decrement-button"
                    onClick={() => handleDecrement(item.product._id)}
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-button-container">
            <Link to="/checkout">
              <button className="checkout-button">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
