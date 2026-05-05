import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Clock, MapPin } from "lucide-react";

export default function AppDescription() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center px-4"
      style={{ backgroundColor: "#000000", paddingTop: "60px", paddingBottom: "60px" }}
    >
      {/* ── Dashed top separator ───────────────────────────── */}
      <div
        style={{
          borderTop: "1px dashed rgba(57,255,20,0.35)",
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto 48px",
        }}
      />

      {/* ── HOW IT WORKS label ─────────────────────────────── */}
      <p
        className="text-center uppercase font-bold"
        style={{
          color: "#39FF14",
          fontSize: "11px",
          letterSpacing: "0.25em",
          marginBottom: "14px",
        }}
      >
        HOW IT WORKS
      </p>

      {/* ── Section title ──────────────────────────────────── */}
      <h2
        className="text-center font-bold"
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          marginBottom: "48px",
        }}
      >
        Simple. Fast. Reliable.
      </h2>

      {/* ── 3-col card grid ────────────────────────────────── */}
      <div
        className="grid md:grid-cols-3 gap-5 mx-auto w-full"
        style={{ maxWidth: "900px" }}
      >
        {/* ── Card 1: Symptoms ─── */}
        <Card
          className="transition-all duration-300 cursor-default"
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(57,255,20,0.15)",
            borderRadius: "14px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.4)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 18px rgba(57,255,20,0.07)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.15)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <CardHeader style={{ paddingBottom: "8px" }}>
            {/* Centered compact pill */}
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "18px" }}>
              <span
                className="font-bold uppercase"
                style={{
                  color: "#39FF14",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.3)",
                  borderRadius: "999px",
                  padding: "4px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                Symptoms or Maintenance
              </span>
            </div>
            {/* Icon circle */}
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.25)",
                borderRadius: "50%",
              }}
            >
              <Car size={20} style={{ color: "#39FF14" }} />
            </div>
            <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>
              Describe Your Issue
            </CardTitle>
            <CardDescription style={{ color: "#8A8A8A", fontSize: "13px", lineHeight: "1.6" }}>
              Tell us what's wrong with your car in a few words
            </CardDescription>
          </CardHeader>
        </Card>

        {/* ── Card 2: Garage ─── */}
        <Card
          className="transition-all duration-300 cursor-default"
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(57,255,20,0.15)",
            borderRadius: "14px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.4)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 18px rgba(57,255,20,0.07)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.15)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <CardHeader style={{ paddingBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "18px" }}>
              <span
                className="font-bold uppercase"
                style={{
                  color: "#39FF14",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.3)",
                  borderRadius: "999px",
                  padding: "4px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                Garage Selection
              </span>
            </div>
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.25)",
                borderRadius: "50%",
              }}
            >
              <MapPin size={20} style={{ color: "#39FF14" }} />
            </div>
            <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>
              Choose a Garage
            </CardTitle>
            <CardDescription style={{ color: "#8A8A8A", fontSize: "13px", lineHeight: "1.6" }}>
              Select from nearby trusted garages
            </CardDescription>
          </CardHeader>
        </Card>

        {/* ── Card 3: Scheduling ─── */}
        <Card
          className="transition-all duration-300 cursor-default"
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(57,255,20,0.15)",
            borderRadius: "14px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.4)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 18px rgba(57,255,20,0.07)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,255,20,0.15)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <CardHeader style={{ paddingBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "18px" }}>
              <span
                className="font-bold uppercase"
                style={{
                  color: "#39FF14",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.3)",
                  borderRadius: "999px",
                  padding: "4px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                Appointment Scheduling
              </span>
            </div>
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.25)",
                borderRadius: "50%",
              }}
            >
              <Clock size={20} style={{ color: "#39FF14" }} />
            </div>
            <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>
              Schedule Pickup
            </CardTitle>
            <CardDescription style={{ color: "#8A8A8A", fontSize: "13px", lineHeight: "1.6" }}>
              Pick a date and time that works for you
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <div className="text-center" style={{ marginTop: "56px" }}>
        <Button
          onClick={() => navigate("/symptoms")}
          className="uppercase font-bold tracking-widest transition-all duration-200 cursor-pointer"
          style={{
            background: "transparent",
            color: "#39FF14",
            border: "1px solid rgba(57,255,20,0.5)",
            borderRadius: "8px",
            padding: "13px 36px",
            fontSize: "13px",
            letterSpacing: "0.12em",
            minHeight: "48px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 14px rgba(57,255,20,0.35)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#39FF14";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(57,255,20,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(57,255,20,0.5)";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          Book a Pickup →
        </Button>
      </div>
    </div>
  );
}