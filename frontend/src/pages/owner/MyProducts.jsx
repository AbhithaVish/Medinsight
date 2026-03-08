import { useEffect, useState } from "react";
import api, { BASE_URL } from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function MyProducts() {

  const [products,setProducts]=useState([]);
  const [filtered,setFiltered]=useState([]);

  const [editingId,setEditingId]=useState(null);
  const [editForm,setEditForm]=useState({});
  const [uploading,setUploading]=useState(null);

  /* FILTER STATES */
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("");
  const [inStock,setInStock]=useState(false);

  useEffect(()=>{ loadProducts(); },[]);

  const loadProducts=async()=>{
    const res=await api.get("/products/my");
    setProducts(res.data);
    setFiltered(res.data);
  };

  /* ================= FILTER LOGIC ================= */

  useEffect(()=>{

    let result=[...products];

    if(search)
      result=result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    if(inStock)
      result=result.filter(p=>p.stock>0);

    if(sort==="priceLow")
      result.sort((a,b)=>a.price-b.price);

    if(sort==="priceHigh")
      result.sort((a,b)=>b.price-a.price);

    if(sort==="stock")
      result.sort((a,b)=>b.stock-a.stock);

    setFiltered(result);

  },[search,sort,inStock,products]);



  /* ================= IMAGE ================= */

  const uploadImage=async(id,file)=>{
    const data=new FormData();
    data.append("image",file);

    setUploading(id);
    await api.post(`/products/${id}/image`,data);
    setUploading(null);

    loadProducts();
  };

  const saveEdit=async(id)=>{
    await api.put(`/products/${id}`,editForm);
    setEditingId(null);
    loadProducts();
  };

  const deleteProduct=async(id)=>{
    if(!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const stockBadge=stock=>({
    padding:"4px 10px",
    borderRadius:"999px",
    fontSize:"12px",
    background:stock>0?"#dcfce7":"#fee2e2",
    color:stock>0?"#166534":"#991b1b"
  });

  return (
    <DashboardLayout title="Manage Products">

      {/* ================= FILTER BAR ================= */}

      <div style={filterBar}>

        <input
          placeholder="Search product..."
          style={input}
          onChange={e=>setSearch(e.target.value)}
        />

        <select
          style={input}
          onChange={e=>setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="priceLow">Price Low → High</option>
          <option value="priceHigh">Price High → Low</option>
          <option value="stock">Stock Level</option>
        </select>

        <label>
          <input
            type="checkbox"
            onChange={e=>setInStock(e.target.checked)}
          />
          {" "} In Stock Only
        </label>

      </div>


      {/* ================= GRID ================= */}

      <div style={grid}>

        {filtered.map(p=>(
          <div key={p.id} style={card}>

            {/* IMAGE */}
            <div style={imageWrapper}>

              {p.image
                ? <img src={`${BASE_URL}/uploads/${p.image}`} style={image}/>
                : <div style={noImage}>No Image</div>
              }

              <label style={uploadOverlay}>
                📷
                <input
                  hidden
                  type="file"
                  onChange={e=>uploadImage(p.id,e.target.files[0])}
                />
              </label>

              {uploading===p.id &&
                <span style={uploadTag}>Uploading...</span>}
            </div>


            {/* EDIT */}
            {editingId===p.id ? (

              <>
                <input style={input}
                  value={editForm.name}
                  onChange={e=>setEditForm({...editForm,name:e.target.value})}
                />

                <input style={input}
                  type="number"
                  value={editForm.price}
                  onChange={e=>setEditForm({...editForm,price:e.target.value})}
                />

                <input style={input}
                  type="number"
                  value={editForm.stock}
                  onChange={e=>setEditForm({...editForm,stock:e.target.value})}
                />

                <div style={btnRow}>
                  <button style={saveBtn}
                    onClick={()=>saveEdit(p.id)}>Save</button>

                  <button style={cancelBtn}
                    onClick={()=>setEditingId(null)}>Cancel</button>
                </div>
              </>

            ):(
              <>
                <h3>{p.name}</h3>

                <p style={price}>
                  Rs. {Number(p.price).toLocaleString()}
                </p>

                <span style={stockBadge(p.stock)}>
                  {p.stock>0
                    ?`${p.stock} In Stock`
                    :"Out of Stock"}
                </span>

                <div style={btnRow}>
                  <button style={editBtn}
                    onClick={()=>{
                      setEditingId(p.id);
                      setEditForm(p);
                    }}>
                    Edit
                  </button>

                  <button style={deleteBtn}
                    onClick={()=>deleteProduct(p.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
}


/* ================= STYLES ================= */

const filterBar={
  display:"flex",
  gap:"15px",
  marginBottom:"25px",
  background:"#fff",
  padding:"15px",
  borderRadius:"12px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
  gap:"25px"
};

const card={
  background:"#fff",
  padding:"18px",
  borderRadius:"16px",
  boxShadow:"0 15px 35px rgba(0,0,0,0.05)"
};

const imageWrapper={position:"relative"};

const image={
  width:"100%",
  height:"190px",
  objectFit:"cover",
  borderRadius:"12px"
};

const noImage={
  height:"190px",
  background:"#f1f5f9",
  borderRadius:"12px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const uploadOverlay={
  position:"absolute",
  right:10,
  bottom:10,
  background:"#2563eb",
  color:"#fff",
  padding:"8px",
  borderRadius:"50%",
  cursor:"pointer"
};

const uploadTag={
  position:"absolute",
  top:10,
  left:10,
  background:"#000",
  color:"#fff",
  padding:"4px 8px",
  borderRadius:"6px"
};

const input={
  padding:"10px",
  borderRadius:"8px",
  border:"1px solid #e2e8f0"
};

const price={
  fontWeight:"700",
  color:"#2563eb"
};

const btnRow={
  display:"flex",
  gap:"10px",
  marginTop:"12px"
};

const editBtn={
  flex:1,
  background:"#2563eb",
  color:"#fff",
  border:"none",
  padding:"10px",
  borderRadius:"8px"
};

const saveBtn={
  flex:1,
  background:"#16a34a",
  color:"#fff",
  border:"none",
  padding:"10px",
  borderRadius:"8px"
};

const cancelBtn={
  flex:1,
  background:"#e2e8f0",
  border:"none",
  padding:"10px",
  borderRadius:"8px"
};

const deleteBtn={
  flex:1,
  background:"#ef4444",
  color:"#fff",
  border:"none",
  padding:"10px",
  borderRadius:"8px"
};