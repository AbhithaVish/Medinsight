// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import API, { getStores, addStore } from "../api/api";

export default function Home() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
    fetchStores();
  }, []);

  async function fetchStores() {
    try {
      const data = await getStores();
      setStores(data || []);
    } catch (err) {
      console.error("Failed to load stores", err);
    }
  }

  async function handleCreateStore(e) {
    e.preventDefault();
    if (!newStoreName) return alert("Give your store a name");
    setCreating(true);
    try {
      // use addStore helper which returns res.data
      const res = await addStore({ name: newStoreName });
      if (res && res.success) {
        setNewStoreName("");
        await fetchStores();
      } else {
        alert(res?.message || res?.error || "Failed to create store");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Create failed");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome{user ? `, ${user.name || user.email}` : ""}!</h1>

      {user && user.role === "shopowner" && (
        <section className="mb-8 p-4 border rounded bg-white max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Create a new store</h2>
          <form onSubmit={handleCreateStore} className="flex gap-2">
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Store name"
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={creating}>
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((s) => (
          <div key={s.id} className="p-4 border rounded bg-white">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">ID: {s.id}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
