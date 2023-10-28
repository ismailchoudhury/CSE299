import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";

import { Button } from "react-bootstrap";
const Home = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();
      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <div className="product-container">
        {products &&
          products.map(product => (
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
                  <h2>{product.name}</h2>
                  <p className="category">Category: {product.category}</p>
                  <p className="price">Price: ৳{product.price}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <p className="description">{product.description}</p>

                  {product.seller && (
                    <p className="seller">Seller: {product.seller.id}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
