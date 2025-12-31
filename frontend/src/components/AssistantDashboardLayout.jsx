import AssistantSidebar from "./AssistantSidebar";

export default function AssistantDashboardLayout({ title, children }) {
  return (
    <div style={{ display: "flex", background: "#f8fafc" }}>
      <AssistantSidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
          minHeight: "100vh"
        }}
      >
        <h1 style={{ marginBottom: 25 }}>{title}</h1>
        {children}
      </main>
    </div>
  );
}
