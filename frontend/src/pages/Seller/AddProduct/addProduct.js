import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

import "./addProduct.css";

const AddProduct = () => {
  const authContext = useContext(AuthContext);
  let seller = null;

  if (authContext.user) {
    seller = authContext.user.Id;
  }

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imgURL: "",
    sellerId: seller,
    stock: "",
  });

  const [sellerProducts, setSellerProducts] = useState([]);
  const [productAdded, setProductAdded] = useState(false); // New state for re-fetching

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products/createproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }

      console.log("Product Data Submitted:", productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        imgURL: "",
        stock: "",
      });

      // Set productAdded to true to trigger re-fetching
      setProductAdded(true);
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

  useEffect(() => {
    // Fetch the seller's products and update the sellerProducts state
    const fetchSellerProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/getProductBySeller/${seller}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSellerProducts(data);
      } catch (error) {
        console.error("Failed to fetch seller's products:", error);
      }
    };

    // Fetch when the component mounts or when productAdded changes
    fetchSellerProducts();
    setProductAdded(false); // Reset productAdded after fetching
  }, [seller, productAdded]);
  return (
    <div className="containerAdd mt-4">
      <h3>Add a Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Stock:
            </label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">
            Image URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="imgURL"
            name="imgURL"
            value={productData.imgURL}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
      <h3>Your Products:</h3>
      <ul>
        {sellerProducts.map(product => (
          <li key={product._id}>
            <h2>
              <Link to={`/updateProduct/${product._id}`}>{product.name}</Link>
            </h2>{" "}
            <p>Price: ৳{product.price}</p>
            <img
              src={product.imgURL}
              alt={product.name}
              width="150"
              height="150"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProduct;
