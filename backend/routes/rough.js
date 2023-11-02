// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";

// const Checkout = () => {
//   const { user } = useAuthContext();
//   const [cart, setCart] = useState([]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchCart = async () => {
//     try {
//       const response = await fetch(`/api/cart/get-cart/${user.Id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setCart(data.userCart);
//       } else {
//         console.error("Error fetching cart:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     // Calculate delivery date 2 days from today
//     const today = new Date();
//     today.setDate(today.getDate() + 2);
//     setDeliveryDate(today.toISOString().split("T")[0]);
//   }, []);

//   const handleConfirmOrder = async () => {
//     const response = await fetch("/api/orders/place-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: user.Id, userCart: cart }),
//     });

//     if (response.ok) {
//       // Clear the user's cart
//       clearCart();

//       // Navigate to the productHome page
//       history.push("/productHome");
//     }
//   };

//   const clearCart = async () => {
//     // Implement a function to clear the user's cart (similar to what you did in the Cart component)
//   };

//   return (
//     <div className="checkout-page">
//       <h1>Checkout</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : cart.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <div className="checkout-container">
//           <p className="total-amount">Total Amount: ৳{calculateTotal()}</p>
//           <p className="delivery-date">Delivery Date: {deliveryDate}</p>
//           <ul className="cart-list">
//             {cart.map(item => (
//               <li key={item._id} className="cart-item">
//                 {/* Display cart item details as in the Cart component */}
//               </li>
//             ))}
//           </ul>
//           <button className="confirm-button" onClick={handleConfirmOrder}>
//             Confirm Order
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

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
                <div className="product-actions"></div>
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
