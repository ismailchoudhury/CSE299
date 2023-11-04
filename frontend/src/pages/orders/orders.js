import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get the user object from the AuthContext

  useEffect(() => {
    // Fetch orders for the logged-in user
    fetch(`/api/orders/${user.Id}`) // Replace with the actual API endpoint
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching orders");
      })
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [user.Id]);

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order._id} className="order-box">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="order-date">Order Date: {order.orderDate}</p>
              <ul className="order-products">
                {order.carts.map((cartItem, index) => (
                  <li key={index} className="product-item">
                    {/* Pass the product ID to ProductDetails */}
                    <ProductDetails productId={cartItem.product} />
                    <p className="product-quantity">
                      Quantity: {cartItem.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product details based on the product ID
    // console.log(`Fetching product details for productId: ${productId}`);
    fetch(`/api/products/getProductById/${productId}`)
      .then(response => {
        // console.log("Response:", response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching product details");
      })
      .then(data => {
        // console.log("Product data:", data);
        setProduct(data);
        setIsLoading(false); // Set isLoading to false when the data is loaded
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Set isLoading to false when there's an error
      });
  }, [productId]);

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product details not found.</p>;
  }

  return (
    <div>
      <p className="product-name">Product Name: {product.name}</p>
      <p className="product-price">Price: ৳{product.price}</p>
      <img src={product.imgURL} alt={product.name} className="product-image" />
    </div>
  );
};

export default Orders;
