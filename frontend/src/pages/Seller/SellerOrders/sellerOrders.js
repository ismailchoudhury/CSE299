import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const SellerOrders = () => {
  const authContext = useContext(AuthContext);
  const sellerId = authContext.user.Id; // Get the seller's ID from the AuthContext

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);

    useEffect(() => {
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
        <img
          src={product.imgURL}
          alt={product.name}
          className="product-image"
        />
      </div>
    );
  };

  useEffect(() => {
    fetch(`/api/orders/getOrdersBySellerId/${sellerId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching seller orders");
      })
      .then(data => {
        const productslist = data.map(order => {
          const orderId = order._id;
          const orderDate = order.orderDate;

          // Mapping through carts array to get product information
          const products = order.carts.map(cartItem => {
            return {
              productId: cartItem.product._id,
              quantity: cartItem.quantity,
            };
          });

          return {
            _id: orderId,
            orderDate: orderDate,
            carts: products,
          };
        });
        setOrders(productslist);
        setIsLoadingOrders(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoadingOrders(false);
      });
  }, [sellerId]);

  return (
    <div className="seller-orders-page">
      <h1>Your Orders</h1>
      {isLoadingOrders ? (
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

export default SellerOrders;
