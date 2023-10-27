// SellerList.js
import React, { useState, useEffect } from "react";

function SellerList() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Fetch seller data from your API endpoint here.
    // Replace 'apiEndpoint' with your actual API URL.
    fetch("/api/user/verify-seller/")
      .then(response => response.json())
      .then(data => setSellers(data));
  }, []);

  return (
    <div>
      <h1>Seller List</h1>
      <table>
        <thead>
          <tr>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerList;
