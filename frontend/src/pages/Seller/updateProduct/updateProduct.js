import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./updateProduct.css";
const UpdateProduct = () => {
  const { productId } = useParams();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  let userId = null;

  if (authContext.user) {
    userId = authContext.user.Id;
  }

  const [product, setProduct] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imgURL: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/getProductById/${productId}`
        );
        if (response.ok) {
          const json = await response.json();
          setProduct(json);
          // Set the current product details when it's fetched
          setUpdatedProductData(json);
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      const updateProductUrl = `/api/products/${productId}`;

      // Create a copy of the updatedProductData with empty values removed
      const updatedDataCopy = Object.keys(updatedProductData).reduce(
        (acc, key) => {
          if (updatedProductData[key] !== "") {
            acc[key] = updatedProductData[key];
          }
          return acc;
        },
        {}
      );

      const response = await fetch(updateProductUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDataCopy),
      });

      if (response.ok) {
        navigate("/addProduct");

        console.log("Product updated successfully");
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };
  const handleDeleteProduct = async () => {
    if (userId) {
      try {
        const deleteProductUrl = `/api/products/`;
        const response = await fetch(deleteProductUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerId: userId, productId }),
        });

        if (response.ok) {
          console.log("Product deleted successfully");
          navigate("/addProduct");
          // You can add code here to handle the success case, e.g., display a success message
        } else {
          console.error("Error deleting product");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerUpdate mt-4">
      <h3>Edit Product: {product.name}</h3>
      <form onSubmit={handleUpdateProduct}>
        <div className="row">
          <div className="col-md-6">
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
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    name: e.target.value,
                  })
                }
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
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    description: e.target.value,
                  })
                }
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
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-6">
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
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    category: e.target.value,
                  })
                }
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
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    imgURL: e.target.value,
                  })
                }
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
                value={updatedProductData.stock}
                onChange={e =>
                  setUpdatedProductData({
                    ...updatedProductData,
                    stock: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
      <button
        onClick={handleDeleteProduct}
        className="btn btn-danger"
        style={{ marginTop: "10px" }}
      >
        Delete Product
      </button>
      <button>
        <Link to="/addProduct" className="goBackLink">
          Go back to your products
        </Link>
      </button>
    </div>
  );
};

export default UpdateProduct;
