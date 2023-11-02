import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
// import "./wishlist.css";

const Wishlist = () => {
  const { user } = useAuthContext();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`/api/wishlist/get-wishlist/${user.Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setWishlist(data.userWishlist);
      } else {
        console.error("Error fetching wishlist:", response.status);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>Wishlist is empty</p>
      ) : (
        <div className="wishlist-container">
          <ul className="wishlist-list">
            {wishlist.map(item => (
              <li key={item._id} className="wishlist-item">
                <img
                  src={item.product.imgURL}
                  alt={item.product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <p className="product-name">{item.product.name}</p>
                  <p className="product-price">৳{item.product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
