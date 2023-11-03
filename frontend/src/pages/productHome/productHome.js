import React, { useEffect, useState, useContext } from "react";
import "./CustomerHome.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const authContext = useContext(AuthContext);
  let userId = null;
  if (authContext.user) {
    userId = authContext.user.Id;
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const json = await response.json();
          setProducts(json);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async productId => {
    try {
      const addCartUrl = "/api/cart/add-to-cart/";
      const response = await fetch(addCartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        setCart([...cart, productId]);
        console.log("Successfully added to cart");
      } else {
        console.log("Cart exceeds product stock.");
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  const handleAddToWishlist = async productId => {
    try {
      const addWishlistUrl = "/api/wishlist/add-to-wishlist/";
      const response = await fetch(addWishlistUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await response.json();

      if (data.message === "Product added to the wishlist successfully.") {
        setWishlist([...wishlist, productId]);
        console.log("Successfully added to wishlist");
      } else if (data.message === "Product is already in the wishlist.") {
        console.log("Product is already in the wishlist.");
      } else {
        console.error("Error adding to wishlist");
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {products.map(product => (
          <div key={product._id} className="product">
            <div className="product-content">
              {product.imgURL && (
                <div className="product-image-container">
                  <img
                    src={product.imgURL}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              )}
              <div className="product-details">
                <h2>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h2>
                <p className="price">Price: ৳{product.price}</p>
                {product.stock === 0 ? (
                  <p className="out-of-stock">Out of stock</p>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  className="add-to-wishlist-button"
                  onClick={() => handleAddToWishlist(product._id)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHome;
