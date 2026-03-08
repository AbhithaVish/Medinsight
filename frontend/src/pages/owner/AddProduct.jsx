import { useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const submit = async () => {
    // Validation
    if (!form.name || parseFloat(form.price) <= 0 || parseInt(form.stock) < 0) {
      handleAlert("error", "Please enter valid product details");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append("image", image);

    try {
      setLoading(true);
      await api.post("/products", data);
      
      handleAlert("success", "Product added successfully to inventory!");
      
      // Reset Form
      setForm({ name: "", price: "", stock: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add product";
      handleAlert("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Product">
      <div className="form-wrapper">
        
        {/* TOP-CENTER ALERT */}
        {alert && (
          <div className={`custom-alert ${alert.type}`}>
            <span>{alert.message}</span>
            <button onClick={() => setAlert(null)}>✕</button>
          </div>
        )}

        <div className="form-card">
          <div className="form-header">
            <h2>New Product</h2>
            <p>Add a new item to your shop's digital shelf</p>
          </div>

          <div className="form-body">
            {/* PRODUCT NAME */}
            <div className="input-group">
              <label>Product Name</label>
              <input
                placeholder="e.g. Digital Blood Pressure Monitor"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* PRICE & STOCK GRID */}
            <div className="input-row">
              <div className="input-group">
                <label>Price (Rs.)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Inventory Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                />
              </div>
            </div>

            {/* MODERN IMAGE UPLOAD */}
            <label className="label-text">Product Image</label>
            <div className={`upload-zone ${preview ? 'has-preview' : ''}`}>
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" />
                  <button className="remove-img" onClick={() => {setPreview(null); setImage(null)}}>Change Image</button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <div className="upload-icon">📸</div>
                  <p>Click or drag image to upload</p>
                  <span>Supports: JPG, PNG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className={`submit-btn ${loading ? 'loading' : ''}`}
              onClick={submit}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner"></span> Saving...</>
              ) : (
                "Add Product to Shop"
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .form-wrapper {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }

        .form-card {
          width: 100%;
          max-width: 550px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
          overflow: hidden;
          border: 1px solid #f1f5f9;
        }

        .form-header {
          padding: 32px 32px 0 32px;
        }

        .form-header h2 {
          margin: 0;
          font-size: 24px;
          color: #1e293b;
          font-weight: 700;
        }

        .form-header p {
          color: #64748b;
          margin: 8px 0 0 0;
          font-size: 15px;
        }

        .form-body {
          padding: 32px;
        }

        .input-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        input {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 15px;
          transition: all 0.2s;
          outline: none;
        }

        input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        /* UPLOAD ZONE */
        .upload-zone {
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          margin-bottom: 24px;
          transition: all 0.2s;
          background: #f8fafc;
          position: relative;
        }

        .upload-zone:hover {
          border-color: #2563eb;
          background: #f1f5f9;
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          cursor: pointer;
        }

        .upload-icon { font-size: 32px; margin-bottom: 12px; }
        
        .upload-placeholder p {
          margin: 0;
          font-weight: 600;
          color: #334155;
        }

        .upload-placeholder span {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .preview-container {
          padding: 12px;
          text-align: center;
        }

        .preview-container img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }

        .remove-img {
          margin-top: 10px;
          background: #f1f5f9;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }

        /* SUBMIT BUTTON */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.1s, background 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .submit-btn:hover { background: #1d4ed8; }
        .submit-btn:active { transform: scale(0.98); }

        /* ALERT STYLES (MATCHING LOGIN) */
        .custom-alert {
          position: fixed;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 24px;
          border-radius: 12px;
          display: flex;
          gap: 15px;
          z-index: 10000;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          animation: slideDown 0.4s ease;
        }

        .custom-alert.error { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
        .custom-alert.success { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
        
        .custom-alert button { background: none; border: none; cursor: pointer; color: inherit; font-weight: bold; }

        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #ffffff66;
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </DashboardLayout>
  );
}