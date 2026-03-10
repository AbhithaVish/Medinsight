import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function XrayAnalysis() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {

    if (!file) {
      alert("Please upload an X-ray image");
      return;
    }

    setLoading(true);
    setResult(null);

    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8001/analyze-xray",
        formData
      );

      setResult(response.data);

    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Failed to analyze X-ray.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="MedInsight AI X-Ray Analysis">

      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>

        {/* Upload Section */}
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          marginBottom: "30px"
        }}>

          <h2>Upload Bone / Joint X-Ray</h2>

          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Supported: Hand, Wrist, Knee, Shoulder, Leg fractures.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const selectedFile = e.target.files[0];

              if (selectedFile) {
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
                setResult(null);
              }

            }}
          />

          <button
            onClick={analyze}
            disabled={loading || !file}
            style={{
              marginTop: "20px",
              padding: "14px",
              background: loading ? "#94a3b8" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px"
            }}
          >
            {loading ? "Processing with AI..." : "Start Analysis"}
          </button>

        </div>


        {/* RESULTS */}
        {result && (

          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}>

            <h3 style={{
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
              marginBottom: "20px"
            }}>
              Analysis Results
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px"
            }}>

              {/* ORIGINAL X-RAY */}
              <div>

                <p style={{ fontWeight: "600", color: "#475569" }}>
                  Original X-Ray
                </p>

                {preview && (

                  <img
                    src={preview}
                    alt="Original"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0"
                    }}
                  />

                )}

              </div>


              {/* AI HEATMAP */}
              <div>

                <p style={{ fontWeight: "600", color: "#475569" }}>
                  AI Fracture Heatmap
                </p>

                {result.heatmap && (

                  <img
                    src={`data:image/jpeg;base64,${result.heatmap}`}
                    alt="Heatmap"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0"
                    }}
                  />

                )}

              </div>

            </div>


            {/* RESULT DETAILS */}
            <div style={{
              marginTop: "30px",
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "15px"
            }}>

              {/* Body Part */}
              <div style={{ marginBottom: "15px" }}>

                <span style={{
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "bold"
                }}>
                  Body Part
                </span>

                <div style={{
                  fontSize: "20px",
                  fontWeight: "bold"
                }}>
                  {result.body_part}
                </div>

              </div>


              {/* Condition */}
              <div style={{ marginBottom: "15px" }}>

                <span style={{
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "bold"
                }}>
                  Condition
                </span>

                <div style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: result.condition === "fracture"
                    ? "#dc2626"
                    : "#16a34a"
                }}>
                  {result.condition.toUpperCase()}
                </div>

              </div>


              {/* Confidence */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}>

                <span><strong>Confidence</strong></span>

                <span style={{
                  color: "#2563eb",
                  fontWeight: "bold"
                }}>
                  {(result.confidence * 100).toFixed(2)}%
                </span>

              </div>


              {/* Risk Level */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}>

                <span><strong>Risk Level</strong></span>

                <span style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  background: result.risk_level === "HIGH"
                    ? "#fee2e2"
                    : "#dcfce7",
                  color: result.risk_level === "HIGH"
                    ? "#991b1b"
                    : "#166534"
                }}>
                  {result.risk_level}
                </span>

              </div>


              <hr style={{
                border: "0.5px solid #e2e8f0",
                margin: "15px 0"
              }} />


              {/* SUMMARY */}
              <p style={{
                fontSize: "14px",
                color: "#334155",
                fontStyle: "italic",
                lineHeight: "1.6"
              }}>
                "{result.summary}"
              </p>


              {/* PRODUCT RECOMMENDATIONS */}
              {result.recommended_tags && result.recommended_tags.length > 0 && (

                <div style={{ marginTop: "20px" }}>

                  <h4 style={{ marginBottom: "10px" }}>
                    Recommended Support Products
                  </h4>

                  <div style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}>

                    {result.recommended_tags.map((tag, index) => (

                      <span
                        key={index}
                        style={{
                          padding: "6px 12px",
                          background: "#e0f2fe",
                          color: "#0369a1",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {tag}
                      </span>

                    ))}

                  </div>

                </div>

              )}

            </div>


            {/* Disclaimer */}
            <p style={{
              marginTop: "20px",
              fontSize: "11px",
              color: "#94a3b8",
              textAlign: "center"
            }}>
              ⚠️ Disclaimer: MedInsight AI is a decision-support tool.
              Final diagnosis should be made by a qualified medical professional.
            </p>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}