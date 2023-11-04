import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const authContext = useContext(AuthContext);
  let userId = null;
  if (authContext.user) {
    userId = authContext.user.Id;
  }

  const [product, setProduct] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({
    stock: 0, // Set the initial values you want to update here
    // Add more fields as needed
  });

  const handleUpdateProduct = async () => {
    try {
      const updateProductUrl = `/api/products/${productId}`;
      const response = await fetch(updateProductUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        // You can add code here to handle the success case, e.g., redirect or display a success message
      } else {
        console.error("Error updating product");
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
    <div className="container mt-4">
      <h3>Add a Product</h3>
      <form onSubmit={handleUpdateProduct}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={updatedProductData.name}
            onChange={handleUpdateProduct}
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
            value={updatedProductData.description}
            onChange={handleUpdateProduct}
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
            value={updatedProductData.price}
            onChange={handleUpdateProduct}
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
            value={updatedProductData.category}
            onChange={handleUpdateProduct}
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
            value={updatedProductData.imgURL}
            onChange={handleUpdateProduct}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
      <h3>Your Products:</h3>
      <ul>
        {updatedProductData.map(product => (
          <li key={product._id}>
            {/* Use Link to redirect to the /updateProduct page with the product's ID */}
            <Link to={`/updateProduct/${product._id}`}>{product.name}</Link>
            <p>Price: ${product.price}</p>
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

export default UpdateProduct;
