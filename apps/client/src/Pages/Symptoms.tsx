import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";

export default function Symptoms() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [maintenance, setMaintenance] = useState("");

  const handleContinue = () => {
    if (symptoms.trim() || maintenance.trim()) {
      const combinedText = [
        symptoms.trim() && `Symptoms: ${symptoms.trim()}`,
        maintenance.trim() && `Maintenance: ${maintenance.trim()}`,
      ]
        .filter(Boolean)
        .join(" | ");

      sessionStorage.setItem("symptoms", combinedText);
      navigate("/garages");
    }
  };

  const isValid = symptoms.trim() || maintenance.trim();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: "#000000" }}
    >
      {/* ── Back button ─────────────────────────────────────── */}
      <div className="w-full" style={{ maxWidth: "640px", marginBottom: "24px" }}>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 transition-colors duration-200 cursor-pointer"
          style={{ color: "#8A8A8A", fontSize: "13px", background: "none", border: "none" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#39FF14")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8A8A8A")}
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>
      </div>

      {/* ── Main card ───────────────────────────────────────── */}
      <Card
        className="w-full"
        style={{
          maxWidth: "640px",
          background: "#0D0D0D",
          border: "1px solid rgba(57,255,20,0.18)",
          borderRadius: "18px",
        }}
      >
        <CardHeader style={{ paddingBottom: "8px" }}>
          {/* Step pill */}
          <div style={{ marginBottom: "16px" }}>
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
              Step 1 of 3 · Symptoms or Maintenance
            </span>
          </div>

          {/* Icon + title row */}
          <div className="flex items-center gap-3" style={{ marginBottom: "6px" }}>
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.25)",
                borderRadius: "50%",
              }}
            >
              <MapPin size={18} style={{ color: "#39FF14" }} />
            </div>
            <CardTitle
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                fontWeight: 700,
                lineHeight: "1.3",
              }}
            >
              What's wrong with your car, or what kind of maintenance do you need?
            </CardTitle>
          </div>

          <CardDescription style={{ color: "#8A8A8A", fontSize: "13px", lineHeight: "1.6", paddingLeft: "52px" }}>
            Fill in at least one of the fields below. You can describe symptoms, request maintenance, or both.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Dashed separator */}
          <div
            style={{
              borderTop: "1px dashed rgba(57,255,20,0.2)",
              marginBottom: "24px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* ── Symptoms field ── */}
            <div>
              <Label
                htmlFor="symptoms"
                style={{
                  color: "#39FF14",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Symptoms
              </Label>
              <Textarea
                id="symptoms"
                placeholder="e.g., The car makes a squeaking noise when I brake, the steering wheel vibrates at high speeds..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                style={{
                  background: symptoms ? "rgba(57,255,20,0.04)" : "#111111",
                  border: symptoms
                    ? "1px solid rgba(57,255,20,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  padding: "12px 14px",
                  resize: "vertical",
                  outline: "none",
                  width: "100%",
                  transition: "border-color 200ms, background 200ms",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(57,255,20,0.6)";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(57,255,20,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = symptoms
                    ? "rgba(57,255,20,0.5)"
                    : "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <p style={{ color: "#555", fontSize: "11px", marginTop: "6px" }}>
                {symptoms.length}/500 characters
              </p>
            </div>

            {/* ── and/or divider ── */}
            <div className="relative flex items-center" style={{ gap: "12px" }}>
              <div style={{ flex: 1, borderTop: "1px dashed rgba(57,255,20,0.15)" }} />
              <span
                style={{
                  color: "#555",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  flexShrink: 0,
                }}
              >
                and / or
              </span>
              <div style={{ flex: 1, borderTop: "1px dashed rgba(57,255,20,0.15)" }} />
            </div>

            {/* ── Maintenance field ── */}
            <div>
              <Label
                htmlFor="maintenance"
                style={{
                  color: "#39FF14",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Maintenance
              </Label>
              <Textarea
                id="maintenance"
                placeholder="e.g., Oil change, brake check, general inspection..."
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                rows={4}
                style={{
                  background: maintenance ? "rgba(57,255,20,0.04)" : "#111111",
                  border: maintenance
                    ? "1px solid rgba(57,255,20,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  padding: "12px 14px",
                  resize: "vertical",
                  outline: "none",
                  width: "100%",
                  transition: "border-color 200ms, background 200ms",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(57,255,20,0.6)";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(57,255,20,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = maintenance
                    ? "rgba(57,255,20,0.5)"
                    : "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <p style={{ color: "#555", fontSize: "11px", marginTop: "6px" }}>
                {maintenance.length}/500 characters
              </p>
            </div>

            {/* ── CTA button ── */}
            <div style={{ paddingTop: "8px" }}>
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                size="lg"
                className="w-full uppercase font-bold tracking-widest transition-all duration-200 cursor-pointer"
                style={{
                  background: isValid ? "transparent" : "transparent",
                  color: isValid ? "#39FF14" : "#444",
                  border: isValid ? "1px solid #39FF14" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                  minHeight: "52px",
                  transition: "all 200ms",
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
                onMouseEnter={(e) => {
                  if (!isValid) return;
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 16px rgba(57,255,20,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(57,255,20,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                Continue to Garage Selection →
              </Button>

              {!isValid && (
                <p
                  className="text-center"
                  style={{ color: "#555", fontSize: "12px", marginTop: "10px" }}
                >
                  Fill in at least one field to continue
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
