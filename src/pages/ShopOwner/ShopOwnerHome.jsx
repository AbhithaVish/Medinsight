// frontend/src/pages/ShopOwner.jsx
import React, { useEffect, useState } from "react";
import API, { getStores, getStoreItems, addStore } from "../../api/api";

export default function ShopOwner() {
  const user = JSON.parse(localStorage.getItem("user")); // 🔥 get logged user
  const [stores, setStores] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [lastError, setLastError] = useState(null);

  const [form, setForm] = useState({ name: "", description: "", price: "", qty: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  const [newName, setNewName] = useState("");
  const [newShort, setNewShort] = useState("");
  const [creatingShop, setCreatingShop] = useState(false);

  /* ---------------- Load Stores ---------------- */
  useEffect(() => {
    (async () => {
      setLoadingStores(true);
      try {
        const s = await getStores();
        setStores(Array.isArray(s) ? s : []);
        if (s.length) setCurrentStoreId(s[0].S_id);
      } catch (err) {
        setLastError(err);
      } finally {
        setLoadingStores(false);
      }
    })();
  }, []);

  /* ---------------- Load Items when store changes ---------------- */
  useEffect(() => {
    if (!currentStoreId) return;

    (async () => {
      setLoadingItems(true);
      try {
        const res = await getStoreItems(currentStoreId);
        setItems(Array.isArray(res) ? res : []);
      } catch (err) {
        setLastError(err);
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, [currentStoreId]);

  /* ---------------- Create Shop ---------------- */
  const handleCreateShop = async () => {
    if (!newName.trim()) return alert("Shop name required");

    if (!user?.id) {
      alert("User ID missing — please login again.");
      return;
    }

    setCreatingShop(true);
    try {
      const created = await addStore({
        name: newName.trim(),
        short: newShort.trim(),
        rating: 0,
        id: user.id, // ⭐ logged user id
      });

      setStores((prev) => [created, ...prev]);
      setNewName("");
      setNewShort("");
      setCurrentStoreId(created.S_id);
    } catch (err) {
      setLastError(err);
      alert("Create shop failed");
    } finally {
      setCreatingShop(false);
    }
  };

  /* ---------------- Add Product ---------------- */
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!currentStoreId) return alert("Select a shop first");
    if (!form.name.trim() || !form.price.trim()) return alert("Name + price required");

    setSavingProduct(true);

    try {
      let created;
      if (imageFile) {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("qty", form.qty);
        fd.append("image", imageFile);

        const res = await API.post(`/stores/${currentStoreId}/items`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        created = res.data;
      } else {
        const payload = {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          qty: parseInt(form.qty || 0),
        };

        const res = await API.post(`/stores/${currentStoreId}/items`, payload);
        created = res.data;
      }

      setItems((prev) => [created, ...prev]);
      setForm({ name: "", description: "", price: "", qty: "" });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setLastError(err);
      alert("Product creation failed");
    } finally {
      setSavingProduct(false);
    }
  };

  const fmt = (v) => (v ?? "—");

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* USER HEADER */}
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Shop Owner Dashboard</h1>

        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            {user?.name || user?.email}
          </p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ---------------- Sidebar ---------------- */}
        <aside className="lg:col-span-1 bg-white border rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Your Shops</h3>

          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 border rounded px-2 py-1"
              placeholder="Shop name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              className="w-20 border rounded px-2 py-1"
              placeholder="Short"
              value={newShort}
              onChange={(e) => setNewShort(e.target.value)}
            />
            <button className="bg-indigo-600 text-white px-3 rounded" onClick={handleCreateShop}>
              Add
            </button>
          </div>

          {stores.map((s) => (
            <div
              key={s.S_id}
              onClick={() => setCurrentStoreId(s.S_id)}
              className={`p-3 rounded cursor-pointer mb-2 ${
                currentStoreId === s.S_id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500">{s.short}</div>
              <div className="text-xs text-gray-400">Rating: {fmt(s.rating)}</div>
            </div>
          ))}
        </aside>

        {/* ---------------- Main Section ---------------- */}
        <main className="lg:col-span-3 space-y-4">

          <section className="bg-white border rounded-2xl p-4">
            <h3 className="text-lg font-semibold">
              {stores.find((s) => s.S_id === currentStoreId)?.name || "Select a shop"}
            </h3>

            <form onSubmit={handleAddProduct} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">

                <input
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Short description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <div className="flex gap-2">
                  <input
                    className="border rounded px-3 py-2 w-24"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                  <input
                    className="border rounded px-3 py-2 w-24"
                    placeholder="Qty"
                    type="number"
                    value={form.qty}
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                  />
                </div>

                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                {imagePreview && <img src={imagePreview} className="h-12 w-12 rounded border" />}
              </div>

              <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
                Add Product
              </button>
            </form>
          </section>

          {/* ---------------- Products List ---------------- */}
          <section className="bg-white border rounded-2xl p-4">
            <h4 className="font-semibold mb-3">Products</h4>

            {items.length === 0 ? (
              <div>No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((it) => (
                  <div key={it.id} className="border rounded-lg p-3">
                    <h5 className="font-medium">{it.name}</h5>
                    <p className="text-xs">{it.description}</p>
                    <p className="font-semibold">LKR {fmt(it.price)}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
