import React, { useEffect, useState } from "react";
import { getStores, getStoreItems, addToCart } from "../../api/api";

export default function Pharmacy() {
  const [stores, setStores] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(null);
  const [storeItems, setStoreItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    (async ()=> {
      try {
        const s = await getStores();
        setStores(s);
        if (s.length) setCurrentStoreId(s[0].id);
      } catch (err) { console.error(err); }
    })();
  }, []);

  useEffect(()=> {
    if (!currentStoreId) return setStoreItems([]);
    (async ()=> {
      setLoading(true);
      const items = await getStoreItems(currentStoreId);
      setStoreItems(items);
      setLoading(false);
    })();
  }, [currentStoreId]);

  const handleAdd = async (item) => {
    try {
      await addToCart({ store_id: currentStoreId, item_id: item.id, qty: 1 });
      alert("Added to cart");
    } catch (err) {
      alert("Add failed");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 bg-white p-4 rounded-2xl border">
        <h4 className="font-bold mb-3">Shops</h4>
        <div className="space-y-2">
          {stores.map(s => (
            <div key={s.id} className={`p-3 rounded-lg ${s.id===currentStoreId ? 'bg-blue-50':''}`} onClick={()=>setCurrentStoreId(s.id)}>
              <div className="font-semibold">{s.name}</div>
              <div className="text-xs text-gray-400">Rating: {s.rating}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white p-4 rounded-2xl border">
          <h3 className="font-bold">{stores.find(s=>s.id===currentStoreId)?.name || 'Select a shop'}</h3>
          <div className="mt-4">
            {loading ? <div>Loading...</div> : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storeItems.map(it => (
                  <div key={it.id} className="border p-4 rounded-lg">
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-xs text-gray-500">{it.description}</div>
                    <div className="mt-2 flex justify-between items-center">
                      <div>LKR {it.price}</div>
                      <button onClick={()=>handleAdd(it)} className="bg-blue-600 text-white px-2 py-1 rounded">Add</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
