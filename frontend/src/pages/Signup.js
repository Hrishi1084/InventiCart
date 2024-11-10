import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Consumer");
  const { signup, isLoading, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, accountType);
  };
  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label>Account Type: </label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="Merchant">Merchant</option>
          <option value="Consumer">Consumer</option>
        </select>
        <button disabled={isLoading}>Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
      <img src="/loginbg.png" alt="background" className="loginbg" />
    </div>
  );
};

export default Signup;
