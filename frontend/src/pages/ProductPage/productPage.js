import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProductPage = () => {
  let { productId } = useParams();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [product, setProduct] = useState(null);
  const authContext = useContext(AuthContext);
  let userId = null;
  if (authContext.user) {
    userId = authContext.user.Id;
  }
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/getProductById/${productId}`
        );
        if (response.ok) {
          const json = await response.json();
          setProduct(json);
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-page">
      <h1>{product.name}</h1>
      <p className="category">Category: {product.category}</p>
      <p className="price">Price: ৳{product.price}</p>
      <p className="stock">Stock: {product.stock}</p>
      <p className="description">{product.description}</p>
      {product.imgURL && (
        <div className="product-image-container">
          <img
            src={product.imgURL}
            alt={product.name}
            className="product-image"
          />
        </div>
      )}

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
    </div>
  );
};

export default ProductPage;
