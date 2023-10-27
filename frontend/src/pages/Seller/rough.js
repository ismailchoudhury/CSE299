// function App() {
//   const { user, userType } = useAuthContext();

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/SignUp" element={<Signup />} />
//           {user === "seller" && (
//             <Route path="/addProduct" element={<AddProduct />} />
//           )}
//           {user && <Navigate to="/addProduct" />}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
// <BrowserRouter>
//         <Routes>
//           {!user && <Route path="/" element={<Home />} />}
//           {!user && <Route path="/Login" element={<Login />} />}
//           {!user && <Route path="/SignUp" element={<Signup />} />}
//           {user && user === "seller" && (
//             <Route path="/addProduct" element={<AddProduct />} />
//           )}
//           {user && user !== "seller" && <Navigate to="/" />}
//         </Routes>
//       </BrowserRouter>

// fetch('/api/user/login/')
//   .then(response => response.json())
//   .then(data => {
//     const userType = data.userType;
//     console.log('User Type:', userType);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import userType from "./pages/Login";
// pages & components
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/Seller/addProduct";

function App() {
  const { user, userType } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          {/* {userType === "seller" && (
            <Route path="/addProduct" element={<AddProduct />} />
          )}
          {user && <Navigate to="/addProduct" />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
// asdfbasdfhbjaknsdbfknasdfbmanbsdffbdafbasmdfbnasdfbn

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
        Category:
      </label>
      <input
        type="text"
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
</div>;
