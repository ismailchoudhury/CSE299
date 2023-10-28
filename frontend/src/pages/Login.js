import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async e => {
    e.preventDefault();

    const allowedUserTypes = ["customer", "admin", "seller"];
    console.log(email);
    console.log(password);
    console.log(userType);

    await login(email, password, userType);
    switch (userType) {
      case "customer":
        navigate("/");
        break;
      case "seller":
        navigate("/addProduct");
        break;
      case "admin":
        navigate("/verifySeller");
        break;
      default:
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <div className="options">
        <label>Log in as:</label>
        <select
          value={userType}
          onChange={e => setUserType(userType => e.target.value)}
        >
          <option value="">Select user type</option>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
          <option value="seller">seller</option>
        </select>
      </div>

      <div className="login-button">
        <button disabled={isLoading} className="my-2">
          Log in
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
