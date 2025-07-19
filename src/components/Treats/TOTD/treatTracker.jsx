"use client";
import { useState, useEffect, useRef } from "react";
import { throwConfetti } from "../../../lib/utils/throwConfetti";

export function TreatTrackerWidget({
  orderCount = 1,
  totalOrders = 8,
  handlePlaceOrderClick,
}) {
  const progress = (orderCount / totalOrders) * 100;
  const remaining = totalOrders - orderCount;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);

  const containerRef = useRef(null);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (orderCount >= totalOrders && !hasCelebrated && containerRef.current) {
      throwConfetti(containerRef.current);
      setHasCelebrated(true);
    }
  }, [orderCount, totalOrders, hasCelebrated]);

  const handleRedeemClick = () => {
    if (orderCount >= totalOrders) {
      setIsRedeemed(true);
      if (containerRef.current) throwConfetti(containerRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: 200,
        height: 200,
        background: isDarkMode
          ? "linear-gradient(to top, #34495e 55%, #2c3e50)"
          : "linear-gradient(to bottom, #fdc8d2 15%, white)",
        borderRadius: "30px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontWeight: 400,
          fontSize: "15px",
          marginTop: "-20px",
          marginBottom: "10px",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>Sweet Treat Tracker</div>
        <img
          src="/images/tracker.png"
          alt="Reward Icon"
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "30px",
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          width: 120,
          height: 120,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "60px",
          overflow: "hidden",
        }}
      >
       {isRedeemed ? (
          <div
            style={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: "60px",
              backgroundColor: "#ff0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulseGlow 2s ease-in-out infinite",
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
            }}
          >
            <img
              src="/images/boba.png"
              alt="Redeemed Treat"
              style={{
                marginTop:"-10px",
                width: "70%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
                animation: "popFadeIn 0.8s ease",
              }}
            />
          </div>
        ) : (
          <>
            <svg width="120" height="120" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="18" cy="18" r={radius} fill="none" stroke="#cfcfcf" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="#ff0000"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>

            <div
              style={{
                position: "absolute",
                fontWeight: "200",
                fontSize: "14px",
                textAlign: "center",
                color: "#222",
                whiteSpace: "pre-line",
              }}
            >
              {remaining > 0
                ? `${remaining} of ${totalOrders} \n orders left`
                : `Treat O'clock!`}
            </div>
          </>
        )}
      </div>

      {/* Redeem CTA */}
      <div
        onClick={handleRedeemClick}
        style={{
          fontSize: "16px",
          fontWeight: "200",
          marginTop: "10px",
          marginBottom: "-20px",
          textAlign: "center",
          textTransform: "capitalize",
          color:
            orderCount >= totalOrders
              ? "#ff0000"
              : isDarkMode
              ? "#ddd"
              : "#bdbdbd",
          cursor: orderCount >= totalOrders ? "pointer" : "default",
          animation:
            orderCount >= totalOrders ? "pulse 1.2s ease-in-out infinite" : "none",
        }}
      >
        Redeem Treat
      </div>
    </div>
  );
}
