import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
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
        setIsLoadingOrders(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoadingOrders(false);
      });
  }, [user.Id]);

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      {isLoadingOrders ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order._id} className="order-box">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="order-date">Order Date: {order.orderDate}</p>
              <p className="delivery-date">
                Delivery Date: {order.deliveryDate}
              </p>
              <p className="address">Address: {order.address}</p>
              <p className="phone-number">Phone Number: {order.phoneNumber}</p>
              <ul className="order-products">
                {order.carts.map((cartItem, index) => (
                  <li key={index} className="product-item">
                    {/* Pass the product ID to ProductDetails */}
                    <ProductDetails productId={cartItem.productId} />
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
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  useEffect(() => {
    // Fetch product details based on the product ID
    fetch(`/api/products/getProductById/${productId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching product details");
      })
      .then(data => {
        setProduct(data);
        setIsLoadingProduct(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoadingProduct(false);
      });
  }, [productId]);

  if (isLoadingProduct) {
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
