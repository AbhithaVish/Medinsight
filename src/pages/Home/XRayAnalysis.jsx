import React, { useState } from "react";
import { uploadXray } from "../../api/api";

export default function XRayAnalysis() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select file");
    setStatus("Uploading...");
    try {
      const res = await uploadXray(file);
      setStatus(res.message || "Uploaded");
    } catch (err) {
      setStatus("Upload failed: " + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold">AI X-Ray Analysis</h2>
      <input className="mt-4" type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
      <div className="mt-3 flex gap-2">
        <button onClick={handleUpload} className="bg-blue-600 text-white px-3 py-1 rounded">Upload</button>
      </div>
      {status && <div className="mt-3">{status}</div>}
    </div>
  );
}
