import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const SellerOrders = () => {
  const authContext = useContext(AuthContext);
  const sellerId = authContext.user.Id; // Get the seller's ID from the AuthContext

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
          console.log("Product data:", data); // Add this line for debugging
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
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
        <img
          src={product.imgURL}
          alt={product.name}
          className="product-image"
        />
      </div>
    );
  };

  useEffect(() => {
    // Fetch seller-specific orders
    fetch(`/api/orders/getOrdersBySellerId/${sellerId}`) // Replace with the actual API endpoint to get seller-specific orders
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching seller orders");
      })
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [sellerId]);

  return (
    <div className="seller-orders-page">
      <h1>Your Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found for your products</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order._id} className="order-box">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="order-date">Order Date: {order.orderDate}</p>
              <ul className="order-products">
                {order.carts.map((cartItem, index) => (
                  <li key={index} className="product-item">
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

export default SellerOrders;
