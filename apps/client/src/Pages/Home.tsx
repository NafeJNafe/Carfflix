import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Clock, MapPin } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── SECTION 1: HERO ────────────────────────────────── */}
      <div
        style={{ backgroundColor: "#000000", position: "relative", overflow: "hidden" }}
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >
      

        {/* Brand name */}
        <h1
  className="uppercase font-black leading-none italic" // Añadimos 'italic' aquí
  style={{
    color: "#39FF14",
    fontSize: "clamp(3.5rem, 12vw, 7rem)",
    letterSpacing: "-0.02em", // Un poco más cerrado para que se vea más compacto como el logo
    transform: "skewX(-2deg)", // Un ligero ajuste extra de inclinación para imitar la velocidad del logo
  }}
>
  CARFFLIX
</h1>

        {/* Tagline */}
        <p
          className="uppercase"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.6rem, 2.5vw, 0.8rem)",
            letterSpacing: "0.2em",
            marginTop: "12px",
          }}
        >
          HOME PICKUP · SMART SCHEDULING · NEARBY WORKSHOPS
        </p>

        {/* CTA — keeps original onClick */}
        <Button
          size="lg"
          onClick={() => navigate("/symptoms")}
          className="uppercase font-bold tracking-widest transition-all duration-200 cursor-pointer mt-10"
          style={{
            background: "transparent",
            color: "#39FF14",
            border: "1px solid #39FF14",
            borderRadius: "8px",
            padding: "14px 40px",
            fontSize: "14px",
            letterSpacing: "0.1em",
            minHeight: "48px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 14px rgba(57,255,20,0.35)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(57,255,20,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          Get Started 
        </Button>

        {/* Sign-in link */}
        <p className="text-sm mt-4" style={{ color: "#8A8A8A" }}>
          Already have an account?{" "}
          <span
            className="cursor-pointer"
            style={{ color: "#39FF14" }}
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>

        {/* Subtle bottom glow */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(57,255,20,0.04), transparent)",
          }}
        />
      </div>

      {/* ── SECTION 2: HOW IT WORKS ─────────────────────────── */}
      <div
        className="w-full py-20 px-4"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Dashed top separator */}
        <div
          style={{
            borderTop: "1px dashed rgba(57,255,20,0.25)",
            maxWidth: "900px",
            margin: "0 auto 64px",
          }}
        />

        {/* Section label */}
        <p
          className="text-center uppercase font-bold"
          style={{
            color: "#39FF14",
            fontSize: "11px",
            letterSpacing: "0.25em",
            marginBottom: "12px",
          }}
        >
          HOW IT WORKS
        </p>

        {/* Section title */}
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

        {/* 3-col grid — uses existing Card components */}
        <div
          className="grid md:grid-cols-3 gap-6 mx-auto"
          style={{ maxWidth: "900px" }}
        >
          {/* Card 1 */}
          <Card
            className="transition-all duration-300 cursor-default"
            style={{
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(57,255,20,0.35)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 20px rgba(57,255,20,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <CardHeader>
              {/* Step pill */}
              <span
                className="inline-block font-bold uppercase text-center"
                style={{
                  display: "block", 
                  color: "#39FF14",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.25)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  marginBottom: "16px",
                }}
              >
                Symptoms or Maintenance
              </span>
              {/* Icon circle */}
              <div
                className="flex items-center justify-center mb-3"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.2)",
                  borderRadius: "50%",
                }}
              >
                <Car size={22} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "16px" }}>
                Describe Your Issue
              </CardTitle>
              <CardDescription style={{ color: "#8A8A8A", fontSize: "14px", lineHeight: "1.6" }}>
                Tell us what's wrong with your car in a few words
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2 */}
          <Card
            className="transition-all duration-300 cursor-default"
            style={{
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(57,255,20,0.35)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 20px rgba(57,255,20,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <CardHeader>
              <span
                className="inline-block font-bold uppercase text-center"
                style={{
                  display: "block",
                  color: "#39FF14",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.25)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  marginBottom: "16px",
                }}
              >
                Garage Selection
              </span>
              <div
                className="flex items-center justify-center mb-3"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.2)",
                  borderRadius: "50%",
                }}
              >
                <MapPin size={22} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "16px" }}>
                Choose a Garage
              </CardTitle>
              <CardDescription style={{ color: "#8A8A8A", fontSize: "14px", lineHeight: "1.6" }}>
                Select from nearby trusted garages
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3 */}
          <Card
            className="transition-all duration-300 cursor-default"
            style={{
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(57,255,20,0.35)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 20px rgba(57,255,20,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <CardHeader>
              <span
                className="inline-block font-bold uppercase text-center"
                style={{
                  display: "block",
                  color: "#39FF14",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.25)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  marginBottom: "16px",
                }}
              >
                Appointment Scheduling 
              </span>
              <div
                className="flex items-center justify-center mb-3"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.2)",
                  borderRadius: "50%",
                }}
              >
                <Clock size={22} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "16px" }}>
                Schedule Pickup
              </CardTitle>
              <CardDescription style={{ color: "#8A8A8A", fontSize: "14px", lineHeight: "1.6" }}>
                Pick a date and time that works for you
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Bottom CTA nudge */}
        <div className="text-center mt-16">
          <Button
            onClick={() => navigate("/symptoms")}
            className="uppercase font-bold tracking-widest transition-all duration-200 cursor-pointer"
            style={{
              background: "transparent",
              color: "#39FF14",
              border: "1px solid rgba(57,255,20,0.4)",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "13px",
              letterSpacing: "0.1em",
              minHeight: "48px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 14px rgba(57,255,20,0.35)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#39FF14";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(57,255,20,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(57,255,20,0.4)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Book a Pickup  →
          </Button>
        </div>
      </div>
    </>
  );
}
