import { useState } from "react";
import { login } from "../services/AuthServices/login";
import { useStateContext } from "../contexts/ContextProvider";
import "../assets/styles/loginPage.css";

export default function LoginPage() {
  const { setUser, setToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      setUser(data.user);
      setToken(data.token);
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">

      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">PharmaAI</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
