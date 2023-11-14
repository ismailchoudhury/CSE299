/* verifySeller.css */

/* Centering the .seller-list component */
.seller-list {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  gap: 20px;
}

/* Styling for each box */
.unverified-box,
.approved-box {
  flex-basis: 48%;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
}

.approved-box {
  background-color: #e6f7e3;
  border-color: #c3e6cb;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.seller-details p {
  margin: 5px 0;
}

button.verify-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  display: block;
  margin-top: 10px;
}

button.verify-button:hover {
  background-color: #0056b3;
}
