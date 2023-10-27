import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async e => {
    e.preventDefault();

    const allowedUserTypes = ["customer", "seller"];

    if (allowedUserTypes.includes(userType)) {
      await signup(email, password);
    } else {
      alert("Invalid user type. Please select 'customer,' or 'seller.'");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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
        <label>Signup as:</label>
        <select value={userType} onChange={e => setUserType(e.target.value)}>
          <option value="">Select user type</option>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
