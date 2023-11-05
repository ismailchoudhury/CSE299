import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./checkout.css";

const Checkout = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      setDeliveryDate(calculateDeliveryDate());

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const calculateDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleConfirmOrder = async () => {
    try {
      const createOrderResponse = await fetch("/api/orders/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.Id,
          userCart: cart,
          address: address,
          phoneNumber: phoneNumber,
          totalAmount: calculateTotal(),
        }),
      });

      if (createOrderResponse.ok) {
        const deleteCartResponse = await fetch(
          `/api/cart/delete-cart/${user.Id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteCartResponse.ok) {
          // After successful order confirmation, use Link to navigate to /productHome
        } else {
          console.error("Error deleting cart:", deleteCartResponse.status);
        }
      } else {
        console.error("Error creating order:", createOrderResponse.status);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
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
                  <p className="product-quantity">Quantity: {item.quantity}</p>
                </div>
                <p className="product-price">৳{item.product.price}</p>{" "}
                <div className="product-actions"></div>
              </li>
            ))}
          </ul>
          <div className="total-amount-container">
            <p className="total-amount">Total Amount: ৳{calculateTotal()}</p>
          </div>
          <div className="delivery-date-container">
            <p className="delivery-date">
              Expected Delivery Date: {deliveryDate}
            </p>
          </div>
          <div className="checkout-form">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <Link to="/productHome">
              <button className="checkout-button" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
