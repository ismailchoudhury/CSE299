import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const authContext = useContext(AuthContext);
  let seller = null;

  if (authContext.user) {
    seller = authContext.user.Id;
  } else {
  }

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0, // Set the initial price to 0
    category: "",
    imgURL: null, // For displaying images
    sellerId: seller,
    stock: "",
  });
  const [sellerProducts, setSellerProducts] = useState([]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setProductData({ ...productData, imgURL: file });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("imgURL", productData.imgURL);
    formData.append("seller", productData.seller);
    formData.append("stock", productData.stock);

    try {
      const response = await fetch("/api/products/createproduct/", {
        method: "POST",
        body: formData, // Send the FormData object
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }

      console.log("Product Data Submitted:", productData);

      // Reset the form
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        imgURL: null,
        stock: "",
      });
    } catch (error) {
      console.error("An error occurred during the POST request:", error);
    }
  };

  useEffect(() => {
    // Fetch the seller's products and update the sellerProducts state
    fetch(`/api/products/getProductBySeller/${seller}`)
      .then(response => {
        if (!response.ok) {
          console.Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setSellerProducts(data);
      })
      .catch(error => {
        console.error("Failed to fetch seller's products:", error);
      });
  }, [seller]);

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
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">
            Upload Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="imgURL"
            name="imgURL"
            onChange={handleImageChange}
          />
        </div>
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
