// src/components/LoginApp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { login, register } from "../api/api";
import { FaUserMd, FaStoreAlt } from "react-icons/fa";

export default function LoginApp() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [role, setRole] = useState("patient"); // "patient" or "shopowner"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      let res;
      if (mode === "login") {
        res = await login({ email, password, role });
      } else {
        res = await register({ name, email, password, role });
      }

      if (!res || !res.success) {
        alert(res?.message || res?.error || "Auth failed");
        setBusy(false);
        return;
      }

      if (res.token) {
        API.defaults.headers.common.Authorization = `Bearer ${res.token}`;
        localStorage.setItem("token", res.token);
      }
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        localStorage.setItem("user", JSON.stringify({ email, role }));
      }

      const returnedRole = (res.user && res.user.role) || role;
      if (returnedRole === "patient") {
        navigate("/patient", { replace: true });
      } else if (returnedRole === "shopowner") {
        navigate("/home", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert(err?.response?.data?.message || err?.message || "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-2">
        {/* Left panel: marketing / brand */}
        <div className="hidden md:flex flex-col items-start justify-center p-10 bg-gradient-to-tr from-sky-600 to-indigo-600 text-white space-y-6">
          <div className="text-3xl font-extrabold tracking-tight">MedInsight</div>
          <p className="opacity-90 max-w-xs">
            Secure, fast access for patients and shop owners. Manage bookings, orders,
            and your profile — all in one place.
          </p>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-3 bg-white/10 p-3 rounded-lg">
              <FaUserMd className="w-5 h-5" />
              <div>
                <div className="text-sm font-semibold">For Patients</div>
                <div className="text-xs opacity-90">Book, consult & order</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 bg-white/10 p-3 rounded-lg">
              <FaStoreAlt className="w-5 h-5" />
              <div>
                <div className="text-sm font-semibold">For Shops</div>
                <div className="text-xs opacity-90">Inventory & quick checkout</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm opacity-90">Trusted by local clinics & pharmacies.</div>
        </div>

        {/* Right panel: form area */}
        <div className="relative p-8 md:p-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h2>
              <p className="text-sm text-slate-500">
                {mode === "login"
                  ? "Sign in to your account"
                  : "Start managing your profile and orders"}
              </p>
            </div>

            {/* Mode switch (Login / Register) */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setMode("login")}
                className={
                  "px-3 py-1 rounded-full text-sm font-medium transition " +
                  (mode === "login"
                    ? "bg-white shadow text-slate-800"
                    : "text-slate-500")
                }
                aria-pressed={mode === "login"}
              >
                Log in
              </button>
              <button
                onClick={() => setMode("register")}
                className={
                  "px-3 py-1 rounded-full text-sm font-medium transition " +
                  (mode === "register"
                    ? "bg-white shadow text-slate-800"
                    : "text-slate-500")
                }
                aria-pressed={mode === "register"}
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-500 block mb-2">You are</label>
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              <RoleButton
                icon={<FaUserMd className="w-4 h-4" />}
                label="Patient"
                active={role === "patient"}
                onClick={() => setRole("patient")}
              />
              <RoleButton
                icon={<FaStoreAlt className="w-4 h-4" />}
                label="Shop Owner"
                active={role === "shopowner"}
                onClick={() => setRole("shopowner")}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input only for register */}
            {mode === "register" && (
              <div>
                <label className="text-xs text-slate-500">Full name</label>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 flex justify-between">
                <span>Password</span>
                {mode === "login" ? (
                  <a href="/forgot" className="text-xs text-sky-600 hover:underline">
                    Forgot?
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">min 8 characters</span>
                )}
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 text-white px-4 py-2 font-semibold shadow hover:bg-sky-700 disabled:opacity-60"
              disabled={busy}
            >
              {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* small footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            By continuing you agree to our <a className="underline">Terms</a> and{" "}
            <a className="underline">Privacy Policy</a>.
          </div>

          {/* Bottom switch helper for smaller screens */}
          <div className="mt-4 text-center md:hidden">
            {mode === "login" ? (
              <div>
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-sky-600 font-medium">
                  Sign up
                </button>
              </div>
            ) : (
              <div>
                Have an account?{" "}
                <button onClick={() => setMode("login")} className="text-sky-600 font-medium">
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper component */
function RoleButton({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition " +
        (active
          ? "bg-white shadow text-slate-900"
          : "text-slate-600 hover:bg-white/50")
      }
      aria-pressed={active}
    >
      <span className="opacity-90">{icon}</span>
      <span className="hidden sm:inline-block">{label}</span>
    </button>
  );
}
