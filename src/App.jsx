"use client";
import { useState } from "react";
import ProductWidget from "./components/Treats/TOTD/menuWidget";
import { TreatTrackerWidget } from "./components/Treats/TOTD/treatTracker";

export default function App() {
  const [orderCount, setOrderCount] = useState(1);

  const handlePlaceOrderClick = () => {
    setOrderCount((prev) => (prev < 8 ? prev + 1 : prev));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0", fontWeight: 600 }}>
          Frisché Bakery & Café
        </h1>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.2, color: "#555" }}>
          A collection of chic, minimalistic app-style widgets designed for Frisché Bakery & Café — highlighting their products and boosting customer engagement with the same charm and clarity the website.
        </p>
      </div>

      {/* Widgets Section */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ProductWidget handlePlaceOrderClick={handlePlaceOrderClick} />
        <TreatTrackerWidget
          orderCount={orderCount}
          totalOrders={8}
          handlePlaceOrderClick={handlePlaceOrderClick}
        />
      </div>
    </main>
  );
}
