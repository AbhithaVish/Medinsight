import { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ConsultantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await api.post("/consultants/auth/login", { email, password });
    login(res.data.token, "CONSULTANT");
    nav("/consultants/dashboard");
  };

  return (
    <form onSubmit={submit} className="auth-card">
      <h2>Consultant Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}