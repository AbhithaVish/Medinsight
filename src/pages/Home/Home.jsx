import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  UploadCloud,
  ShoppingBag,
  Users,
  HeartHandshake,
  Bell,
  Search,
  Menu
} from "lucide-react";

/* -------------------------
   Fake API (simulate backend)
   ------------------------- */
const fakeApi = {
  fetchStores: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: "s1", name: "City Pharmacy", short: "CP", rating: 4.6 },
            { id: "s2", name: "HealthNet Pharmacy", short: "HN", rating: 4.3 },
            { id: "s3", name: "Wellness Drugs", short: "WD", rating: 4.4 }
          ]),
        300
      )
    ),

  fetchStoreItems: (storeId) =>
    new Promise((resolve) =>
      setTimeout(() => {
        const base = [
          { id: 1, name: "Paracetamol 500mg", price: 120, stock: 12, desc: "Pain reliever and fever reducer" },
          { id: 2, name: "Amoxicillin 250mg", price: 250, stock: 6, desc: "Antibiotic for bacterial infections" },
          { id: 3, name: "Vitamin D3 1000 IU", price: 450, stock: 20, desc: "Supports bone health" },
          { id: 4, name: "Cough Syrup 100ml", price: 350, stock: 8, desc: "Relieves cough and throat irritation" },
          { id: 5, name: "Antacid Tablets", price: 180, stock: 15, desc: "For heartburn and indigestion" }
        ];
        const seed = storeId.charCodeAt(storeId.length - 1);
        const items = base.map((it) => ({
          ...it,
          price: Math.round(it.price * (1 + ((seed % 5) - 2) * 0.05)),
          stock: Math.max(1, it.stock + (seed % 7) - 3)
        }));
        resolve(items);
      }, 450)
    ),

  fetchAppointments: () =>
    new Promise((resolve) =>
      setTimeout(() => resolve([{ id: 1, doctor: "Dr. Aruna Perera", date: "2025-10-25T09:30:00", location: "Asiri Hospital" }]), 200)
    ),

  fetchPrescriptions: () =>
    new Promise((resolve) =>
      setTimeout(() => resolve([{ id: 4029, title: "Order #4029", status: "Delivered", provider: "HealthNet" }]), 200)
    )
};

/* -------------------------
   Helpers & Subcomponents
   ------------------------- */
const groupCartByStore = (cart) => {
  const map = {};
  for (const it of cart) {
    if (!map[it.storeId]) map[it.storeId] = { storeId: it.storeId, items: [], total: 0 };
    map[it.storeId].items.push(it);
    map[it.storeId].total += it.price * it.qty;
  }
  return Object.values(map);
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Header = ({ onBook, cartCount, navigate, mobileToggle }) => (
  <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
    <div className="flex items-center gap-4 w-1/2">
      <button className="md:hidden text-gray-500" onClick={mobileToggle}><Menu /></button>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="text" placeholder="Search for doctors, medicines, or reports..." className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="hidden sm:inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm hover:shadow-md" onClick={() => navigate("/login")}>Log in</button>
      <button className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600" onClick={() => navigate("/login")}>Sign up</button>

      <button className="relative text-gray-500 hover:text-blue-600 transition"><Bell size={20} /><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
      <button onClick={onBook} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition shadow-lg">Book Appointment</button>
      <button className="relative text-gray-600" title="Open cart">Cart <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">{cartCount}</span></button>
    </div>
  </header>
);

/* -------------------------
   Main Dashboard Component
   ------------------------- */
export default function MedInsightDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Stores & products
  const [stores, setStores] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(null);
  const [storeItems, setStoreItems] = useState([]);

  // Common states
  const [cart, setCart] = useState([]); // items: { ...item, qty, storeId }
  const [appointments, setAppointments] = useState([]);
  // const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await fakeApi.fetchStores();
      if (!mounted) return;
      setStores(s);
      if (s.length > 0) setCurrentStoreId(s[0].id);
      const appts = await fakeApi.fetchAppointments();
      if (!mounted) return;
      setAppointments(appts);
      // const rx = await fakeApi.fetchPrescriptions();
      if (!mounted) return;
      // setPrescriptions(rx);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadItems = async () => {
      if (!currentStoreId) return setStoreItems([]);
      setLoading(true);
      const items = await fakeApi.fetchStoreItems(currentStoreId);
      if (cancelled) return;
      setStoreItems(items);
      setLoading(false);
    };
    loadItems();
    return () => { cancelled = true; };
  }, [currentStoreId]);

  /* Cart operations */
  const handleAddToCart = (item, storeId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.storeId === storeId);
      if (existing) return prev.map((i) => (i.id === item.id && i.storeId === storeId ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1, storeId }];
    });
  };

  const handleRemoveFromCart = (itemId, storeId) => {
    setCart((prev) => prev.filter((i) => !(i.id === itemId && i.storeId === storeId)));
  };

  const handleUpdateQty = (itemId, storeId, qty) => {
    setCart((prev) => prev.map((i) => (i.id === itemId && i.storeId === storeId ? { ...i, qty: Math.max(1, qty) } : i)));
  };

  const handleCheckout = async (forStoreId = null) => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (forStoreId) {
      setCart((prev) => prev.filter((i) => i.storeId !== forStoreId));
      alert(`Checkout successful for store ${forStoreId}.`);
    } else {
      setCart([]);
      alert("Checkout successful for all stores.");
    }
    setLoading(false);
  };

  const totalCart = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-gray-100">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity size={28} strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-tight">MedInsight</span>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
            <NavItem icon={<Activity size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
            <NavItem icon={<UploadCloud size={18} />} label="AI X-Ray Analysis" active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} />
            <NavItem icon={<ShoppingBag size={18} />} label={`Pharmacy Store (${cart.length})`} active={activeTab === "pharmacy"} onClick={() => setActiveTab("pharmacy")} />
            <NavItem icon={<Users size={18} />} label="Care Assistants" active={activeTab === "assistants"} onClick={() => setActiveTab("assistants")} />
            <NavItem icon={<HeartHandshake size={18} />} label="Mental Support" active={activeTab === "support"} onClick={() => setActiveTab("support")} />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">AV</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">Abhitha V.</p>
              <p className="text-xs text-gray-500 truncate">Patient Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header onBook={() => alert("Book flow placeholder")} cartCount={cart.length} navigate={navigate} mobileToggle={() => setMobileOpen((s) => !s)} />

        {mobileOpen && (
          <div className="md:hidden p-4 border-b bg-white">
            <div className="flex gap-2">
              <button onClick={() => setActiveTab("dashboard")} className="flex-1 text-left">Dashboard</button>
              <button onClick={() => setActiveTab("pharmacy")} className="flex-1 text-left">Pharmacy</button>
            </div>
          </div>
        )}

        <div className="p-8 space-y-8">
          {activeTab === "dashboard" && (
            <div>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                  <p className="text-gray-500 mt-1">Welcome back to your health hub.</p>
                </div>
                <div className="text-sm text-gray-500">Last updated: <span className="font-medium text-gray-800">Today</span></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-xl">
                  <h3 className="text-lg font-bold mb-1">New X-Ray Analysis</h3>
                  <p className="text-blue-100 text-sm">Upload your scan for instant AI diagnostic results.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Next Appointment</h3>
                  <p className="text-gray-500 text-sm mb-2">{appointments[0]?.doctor} • {appointments[0]?.location}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Nearby Shops</h3>
                  <p className="text-gray-500 text-sm mb-2">Click a shop to view its catalog.</p>
                  <div className="mt-3 flex gap-2">
                    {stores.slice(0, 3).map((s) => (
                      <button key={s.id} onClick={() => { setActiveTab("pharmacy"); setCurrentStoreId(s.id); }} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">{s.short}</div>
                        <div className="text-xs">{s.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pharmacy" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 bg-white p-4 rounded-2xl border">
                <h4 className="font-bold mb-3">Shops</h4>
                <div className="space-y-2">
                  {stores.map((s) => (
                    <div key={s.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${s.id === currentStoreId ? "bg-blue-50" : "hover:bg-gray-50"}`} onClick={() => setCurrentStoreId(s.id)}>
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">{s.short}</div>
                      <div>
                        <div className="text-sm font-semibold">{s.name}</div>
                        <div className="text-xs text-gray-400">Rating: {s.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <h5 className="font-semibold">Quick Checkout</h5>
                  <p className="text-xs text-gray-500 mb-2">Checkout items per store directly.</p>
                  {stores.map((s) => (
                    <div key={`chk-${s.id}`} className="flex items-center justify-between text-sm mb-2">
                      <div>{s.name}</div>
                      <button onClick={() => handleCheckout(s.id)} className="text-xs text-blue-600">Checkout</button>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-bold">All Stores</div>
                    <div className="font-bold">LKR {totalCart}</div>
                  </div>
                  <button onClick={() => handleCheckout(null)} className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg">Checkout All</button>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white p-4 rounded-2xl border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{stores.find((s) => s.id === currentStoreId)?.name || "Select a shop"}</h3>
                      <p className="text-xs text-gray-500">Browse products available in this shop.</p>
                    </div>
                    <div className="text-sm text-gray-500">Items: {storeItems.length}</div>
                  </div>

                  <div className="mt-4">
                    {loading ? (
                      <div className="text-sm text-gray-500">Loading products...</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {storeItems.map((item) => (
                          <div key={`${currentStoreId}-${item.id}`} className="border p-4 rounded-lg flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <div className="text-xs text-gray-400">Stock: {item.stock}</div>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">{item.desc}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="text-sm font-medium">LKR {item.price}</div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleAddToCart(item, currentStoreId)} className="text-sm px-2 py-1 rounded bg-blue-50 text-blue-600">Add</button>
                                <button onClick={() => alert("Open product detail (demo)")} className="text-sm text-gray-600 underline">Details</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border">
                  <h4 className="font-bold mb-3">Cart</h4>
                  {cart.length === 0 ? (
                    <div className="text-sm text-gray-500">Your cart is empty.</div>
                  ) : (
                    <div className="space-y-3">
                      {groupCartByStore(cart).map((group) => (
                        <div key={`grp-${group.storeId}`} className="border p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{stores.find((s) => s.id === group.storeId)?.name || group.storeId}</div>
                            <div className="text-sm text-gray-500">LKR {group.total}</div>
                          </div>
                          <div className="space-y-2">
                            {group.items.map((ci) => (
                              <div key={`${ci.storeId}-${ci.id}`} className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-semibold">{ci.name}</div>
                                  <div className="text-xs text-gray-400">LKR {ci.price} • Qty:</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="number" min={1} value={ci.qty} onChange={(e) => handleUpdateQty(ci.id, ci.storeId, Number(e.target.value))} className="w-16 text-sm border rounded px-2 py-1" />
                                  <div className="text-sm font-semibold">LKR {ci.price * ci.qty}</div>
                                  <button onClick={() => handleRemoveFromCart(ci.id, ci.storeId)} className="text-xs text-red-500">Remove</button>
                                </div>
                              </div>
                            ))}

                            <div className="mt-2 flex items-center justify-between">
                              <div className="text-sm font-medium">Store total</div>
                              <div className="text-sm font-bold">LKR {group.total}</div>
                            </div>

                            <div className="mt-2 flex gap-2">
                              <button onClick={() => handleCheckout(group.storeId)} className="bg-blue-600 text-white px-3 py-2 rounded">Checkout this store</button>
                              <button onClick={() => alert("Saved for later (demo)")} className="border px-3 py-2 rounded">Save</button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="pt-2 border-t flex items-center justify-between">
                        <div className="font-bold">Grand Total</div>
                        <div className="font-bold">LKR {totalCart}</div>
                      </div>

                      <div className="mt-3">
                        <button onClick={() => handleCheckout(null)} className="w-full bg-blue-600 text-white py-2 rounded-lg">Checkout All Stores</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold">AI X-Ray Analysis</h3>
              <p className="text-sm text-gray-500 mt-2">Upload a scan to run AI analysis (demo).</p>
            </div>
          )}

          {activeTab === "support" && <div className="bg-white p-6 rounded-2xl border border-indigo-100 text-center">Support / Chat placeholder</div>}
        </div>
      </main>
    </div>
  );
}
