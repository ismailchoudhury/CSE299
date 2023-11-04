import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./categoryPage.css";
const CategoryProduct = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  let { productId } = useParams();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [product, setProduct] = useState(null);
  const authContext = useContext(AuthContext);
  let userId = null;
  if (authContext.user) {
    userId = authContext.user.Id;
  }
  useEffect(() => {
    // Fetch products for the specified category from the API
    fetch(`/api/products/category/${category}`)
      .then(response => response.json())
      .then(data => setCategoryProducts(data))
      .catch(error =>
        console.error("Failed to fetch category products:", error)
      );
  }, [category]);

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
        console.log("Product is already in the wishlist.");
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  const handleAddToWishlist = async productId => {
    console.log();
    try {
      const addwishlistUrltUrl = "/api/wishlist/add-to-wishlist/";
      const response = await fetch(addwishlistUrltUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await response.json();
      console.log(data);

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
    <div className="product-details-page">
      <h1>Products in the "{category}" Category</h1>
      <ul>
        {categoryProducts.map(product => (
          <li key={product._id}>
            <div className="product-image-container">
              <img
                src={product.imgURL}
                alt={product.name}
                className="product-image"
              />
            </div>
            <h3 className="product-name smaller-name">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h3>{" "}
            <p className="price">Price: {product.price}</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
            <button
              className="add-to-wishlist-button"
              onClick={() => handleAddToWishlist(product._id)}
            >
              Add to Wishlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryProduct;
