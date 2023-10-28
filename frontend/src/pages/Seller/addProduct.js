import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imgURL: "",
    seller: "",
    stock: "",
  });

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
        // You can handle the error here, e.g., display an error message.
        return;
      }

      // Handle success, e.g., reset the form or perform any other actions.
      console.log("Product Data Submitted:", productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        imgURL: "",
        seller: "",
        stock: "",
      });
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
      // You can handle the error here, e.g., display an error message.
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add a Product</h3>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label htmlFor="seller" className="form-label">
            Seller:
          </label>
          <input
            type="text"
            className="form-control"
            id="seller"
            name="seller"
            value={productData.seller}
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
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
