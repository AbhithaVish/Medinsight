import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/api";

export default function LoginApp() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await login({ email, password });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/home");
      } else {
        const res = await register({ email, password, name });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/home");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Auth failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{mode === "login" ? "Log in" : "Register"}</h2>

        {mode === "register" && (
          <input className="w-full mb-3 p-2 border rounded" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
        )}
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full mb-3 p-2 border rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white py-2 rounded">{mode === "login" ? "Log in" : "Create account"}</button>

        <div className="mt-4 text-sm text-center">
          {mode === "login" ? (
            <>Don't have an account? <button type="button" className="text-blue-600" onClick={()=>setMode("register")}>Sign up</button></>
          ) : (
            <>Have an account? <button type="button" className="text-blue-600" onClick={()=>setMode("login")}>Log in</button></>
          )}
        </div>
      </form>
    </div>
  );
}
