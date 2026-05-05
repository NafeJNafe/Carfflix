import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: "#000000", position: "relative", overflow: "hidden" }}
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      {/* Brand name */}
      <h1
        className="uppercase font-black leading-none italic"
        style={{
          color: "#39FF14",
          fontSize: "clamp(3.5rem, 12vw, 7rem)",
          letterSpacing: "-0.02em",
          transform: "skewX(-2deg)",
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

      {/* CTA — NAVIGATES TO DESCRIPTION PAGE */}
      <Button
        size="lg"
        onClick={() => navigate("/app-description")}
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
  );
}