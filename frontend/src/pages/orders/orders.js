import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Orders = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user.Id;

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

  function formatDate(date) {
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    }
    return "N/A";
  }

  useEffect(() => {
    fetch(`/api/orders/${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching seller orders");
      })
      .then(data => {
        const productslist = data.map(order => {
          const orderId = order._id;
          const orderDate = formatDate(order.orderDate);
          const deliveryDate = formatDate(order.deliveryDate);
          const address = order.address;
          const phoneNumber = order.phoneNumber;

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
            deliveryDate: deliveryDate,
            address: address,
            phoneNumber: phoneNumber,
          };
        });
        setOrders(productslist);
        setIsLoadingOrders(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoadingOrders(false);
      });
  }, [userId]);

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
              <p className="delivery-date">
                Delivery Date: {order.deliveryDate}
              </p>
              <p className="address">Address : {order.address}</p>
              <p className="phoneNumber">Contact Number: {order.phoneNumber}</p>
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

export default Orders;
