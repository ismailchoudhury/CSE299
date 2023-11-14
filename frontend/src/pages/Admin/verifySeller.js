import React, { useState, useEffect } from "react";
import "./verifySeller.css";

function SellerList() {
  const [sellers, setSellers] = useState([]);
  const [approvedSellers, setApprovedSellers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Define the URL of your API endpoint to fetch unverified sellers
    const unverifiedUrl = "/api/user/getUnverified-sellers/";
    const approvedUrl = "/api/user/getVerified-sellers/";

    try {
      const unverifiedResponse = await fetch(unverifiedUrl);
      const approvedResponse = await fetch(approvedUrl);

      if (!unverifiedResponse.ok || !approvedResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const unverifiedData = await unverifiedResponse.json();
      const approvedData = await approvedResponse.json();

      setSellers(unverifiedData);
      setApprovedSellers(approvedData);
    } catch (error) {
      console.error("Error fetching seller data: ", error);
    }
  };

  const handleVerifySeller = async sellerId => {
    try {
      // Define the URL of your API endpoint to verify a seller
      const verifyUrl = "/api/user/verify-seller/";

      const response = await fetch(verifyUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId: "653c23708d3bd67f96aef925", sellerId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Remove the verified seller from the unverified seller list and add it to the approved seller list
      setSellers(prevSellers =>
        prevSellers.filter(seller => seller._id !== sellerId)
      );

      setApprovedSellers(prevApprovedSellers => [
        ...prevApprovedSellers,
        sellers.find(seller => seller._id === sellerId),
      ]);
    } catch (error) {
      console.error("Error verifying seller: ", error);
    }
  };

  return (
    <div className="seller-list-page">
      {/* <h1>Seller List</h1> */}
      <div className="lists-container">
        <div className="unverified-box">
          <h3>Unverified Seller List</h3>
          <ul>
            {sellers.map(seller => (
              <li key={seller._id} className="seller-item">
                <p>ID: {seller._id}</p>
                <p>Email: {seller.email}</p>
                {!seller.isVerified && (
                  <button
                    onClick={() => handleVerifySeller(seller._id)}
                    className="verify-button"
                  >
                    Verify Seller
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {approvedSellers.length === 0 ? (
          <p>No approved sellers found</p>
        ) : (
          <div className="approved-box">
            <h3>Approved Seller List</h3>
            <ul>
              {approvedSellers.map(seller => (
                <li key={seller._id} className="seller-item">
                  <p>ID: {seller._id}</p>
                  <p>Email: {seller.email}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerList;
