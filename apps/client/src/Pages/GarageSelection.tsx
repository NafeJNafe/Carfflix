import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import type { Garage } from "@/types";

export default function GarageSelection() {
  const navigate = useNavigate();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      const response = await api.get("/garages");
      setGarages(response.data.garages);
    } catch (error) {
      console.error("Error fetching garages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedGarage) {
      sessionStorage.setItem("selectedGarage", JSON.stringify(selectedGarage));
      navigate("/booking");
    }
  };

  /* ── Loading state ─────────────────────────────────── */
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "#000000" }}
      >
        <div
          className="animate-pulse rounded-full"
          style={{
            width: "12px",
            height: "12px",
            background: "#39FF14",
            boxShadow: "0 0 12px rgba(57,255,20,0.6)",
          }}
        />
        <p
          style={{
            color: "#8A8A8A",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Loading workshops...
        </p>
      </div>
    );
  }

  /* ── Main render ─────────────────────────────────────── */
  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ backgroundColor: "#000000" }}
    >
      {/* ── Back button ── */}
      <div className="w-full" style={{ maxWidth: "960px", marginBottom: "32px" }}>
        <button
          onClick={() => navigate("/symptoms")}
          className="flex items-center gap-2 transition-colors duration-200 cursor-pointer"
          style={{ color: "#8A8A8A", fontSize: "13px", background: "none", border: "none" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "#39FF14")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "#8A8A8A")
          }
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </div>

      {/* ── Dashed top separator ── */}
      <div
        style={{
          borderTop: "1px dashed rgba(57,255,20,0.25)",
          maxWidth: "960px",
          width: "100%",
          margin: "0 auto 40px",
        }}
      />

      {/* ── Header ── */}
      <div className="w-full mb-8" style={{ maxWidth: "960px" }}>
        {/* Step pill */}
        <div style={{ marginBottom: "14px" }}>
          <span
            className="font-bold uppercase"
            style={{
              color: "#39FF14",
              fontSize: "10px",
              letterSpacing: "0.15em",
              background: "rgba(57,255,20,0.08)",
              border: "1px solid rgba(57,255,20,0.3)",
              borderRadius: "999px",
              padding: "4px 12px",
            }}
          >
            Step 2 of 3 · Garage Selection
          </span>
        </div>

        <h1
          className="uppercase font-black italic"
          style={{
            color: "#39FF14",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          Select a Workshop
        </h1>
        <p style={{ color: "#8A8A8A", fontSize: "14px" }}>
          Trusted partners near your location
        </p>
      </div>

      {/* ── Garage grid ── */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
        style={{ maxWidth: "960px" }}
      >
        {garages.map((garage) => {
          const isSelected = selectedGarage?.id === garage.id;

          return (
            <Card
              key={garage.id}
              className="cursor-pointer transition-all duration-250"
              style={{
                background: "#0A0A0A",
                border: isSelected
                  ? "2px solid #39FF14"
                  : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                boxShadow: isSelected
                  ? "0 0 20px rgba(57,255,20,0.15)"
                  : "none",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={() => setSelectedGarage(garage)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(57,255,20,0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 20px rgba(57,255,20,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }
              }}
            >
              {/* Selected checkmark badge */}
              {isSelected && (
                <div
                  className="absolute top-3 right-3"
                  style={{ color: "#39FF14" }}
                >
                  <CheckCircle2 size={18} />
                </div>
              )}

              <CardHeader style={{ paddingBottom: "8px" }}>
                {/* MapPin icon circle — primary visual motif */}
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: isSelected
                      ? "rgba(57,255,20,0.12)"
                      : "rgba(57,255,20,0.06)",
                    border: isSelected
                      ? "1px solid rgba(57,255,20,0.5)"
                      : "1px solid rgba(57,255,20,0.2)",
                    borderRadius: "50%",
                    transition: "all 200ms",
                  }}
                >
                  <MapPin
                    size={22}
                    style={{
                      color: "#39FF14",
                      filter: isSelected
                        ? "drop-shadow(0 0 6px rgba(57,255,20,0.5))"
                        : "none",
                    }}
                  />
                </div>

                <CardTitle
                  style={{
                    color: isSelected ? "#39FF14" : "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 700,
                    transition: "color 200ms",
                    marginBottom: "4px",
                  }}
                >
                  {garage.name}
                </CardTitle>
              </CardHeader>

              <CardContent style={{ paddingTop: "0" }}>
                {/* Dashed mini divider */}
                <div
                  style={{
                    borderTop: "1px dashed rgba(57,255,20,0.12)",
                    marginBottom: "12px",
                  }}
                />

                {/* Address */}
                <div className="flex items-start gap-2 mb-2">
                  <MapPin
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#39FF14" }}
                  />
                  <CardDescription
                    style={{ color: "#8A8A8A", fontSize: "12px", lineHeight: "1.5" }}
                  >
                    {garage.address}
                  </CardDescription>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 mb-4">
                  <Phone size={13} className="flex-shrink-0" style={{ color: "#39FF14" }} />
                  <span style={{ color: "#8A8A8A", fontSize: "12px" }}>
                    {garage.phone}
                  </span>
                </div>

                {/* Select button */}
                <button
                  className="w-full uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer"
                  style={{
                    background: isSelected ? "rgba(57,255,20,0.08)" : "transparent",
                    color: isSelected ? "#39FF14" : "#8A8A8A",
                    border: isSelected
                      ? "1px solid rgba(57,255,20,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "9px 0",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    minHeight: "40px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGarage(garage);
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(57,255,20,0.4)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#8A8A8A";
                    }
                  }}
                >
                  {isSelected ? "✓ Selected" : "Select"}
                </button>
              </CardContent>
            </Card>
          );
        })}

        {/* ── Empty state ── */}
        {garages.length === 0 && (
          <div
            className="col-span-full flex flex-col items-center justify-center py-16"
            style={{
              border: "1px dashed rgba(57,255,20,0.2)",
              borderRadius: "16px",
              background: "#0A0A0A",
            }}
          >
            <MapPin size={36} style={{ color: "#333", marginBottom: "12px" }} />
            <p style={{ color: "#555", fontSize: "14px" }}>
              No workshops available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="w-full" style={{ maxWidth: "960px" }}>
        <Button
          onClick={handleContinue}
          disabled={!selectedGarage}
          size="lg"
          className="w-full uppercase font-bold tracking-widest transition-all duration-200"
          style={{
            background: "transparent",
            color: selectedGarage ? "#39FF14" : "#444",
            border: selectedGarage
              ? "1px solid #39FF14"
              : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            fontSize: "13px",
            letterSpacing: "0.12em",
            minHeight: "52px",
            cursor: selectedGarage ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (!selectedGarage) return;
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 18px rgba(57,255,20,0.35)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(57,255,20,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          Continue to Booking Form →
        </Button>
      </div>
    </div>
  );
}
