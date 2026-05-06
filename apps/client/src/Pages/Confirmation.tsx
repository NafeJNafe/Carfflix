import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Home, MapPin, Calendar, Car, FileText } from "lucide-react";
import type { Garage, BookingData } from "@/types";

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = {
  color: "#39FF14",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "4px",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#0D0D0D",
  border: "1px solid rgba(57,255,20,0.15)",
  borderRadius: "16px",
  marginBottom: "20px",
};

export default function Confirmation() {
  const navigate = useNavigate();
  const [appointmentId, setAppointmentId] = useState<string>("");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const id = sessionStorage.getItem("appointmentId");
    const dataStr = sessionStorage.getItem("bookingData");
    const garageStr = sessionStorage.getItem("selectedGarage");

    if (!id || !dataStr || !garageStr) {
      navigate("/");
      return;
    }

    setAppointmentId(id);
    setBookingData(JSON.parse(dataStr));
    setSelectedGarage(JSON.parse(garageStr));
  }, [navigate]);

  const handleBackHome = () => {
    sessionStorage.removeItem("symptoms");
    sessionStorage.removeItem("selectedGarage");
    sessionStorage.removeItem("appointmentId");
    sessionStorage.removeItem("bookingData");
    navigate("/");
  };

  if (!bookingData || !selectedGarage) return null;

  const formattedDate = new Date(bookingData.pickupDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12" style={{ backgroundColor: "#000000" }}>
      
      {/* ── Header ── */}
      <div className="w-full text-center mb-10" style={{ maxWidth: "720px" }}>
        <div className="inline-flex items-center justify-center mb-6" 
             style={{ 
               width: "80px", 
               height: "80px", 
               background: "rgba(57,255,20,0.1)", 
               borderRadius: "50%",
               border: "2px solid #39FF14",
               boxShadow: "0 0 20px rgba(57,255,20,0.2)"
             }}>
          <CheckCircle2 size={40} style={{ color: "#39FF14" }} />
        </div>
        <h1 className="font-bold uppercase tracking-tighter" style={{ color: "#FFFFFF", fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}>
          Booking Confirmed
        </h1>
        <p style={{ color: "#8A8A8A", fontSize: "14px", marginTop: "8px" }}>
          Your appointment has been registered as <span style={{ color: "#39FF14", fontWeight: 600 }}>#{appointmentId}</span>
        </p>
      </div>

      <div className="w-full" style={{ maxWidth: "720px" }}>
        
        {/* ── Summary Card ── */}
        <Card style={sectionCardStyle}>
          <CardHeader style={{ paddingBottom: "12px" }}>
            <CardTitle style={{ color: "#39FF14", fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Appointment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Client & Time */}
              <div className="space-y-6">
                <div>
                  <span style={labelStyle}>Client Details</span>
                  <p className="text-white font-medium">{bookingData.name}</p>
                  <p style={{ color: "#8A8A8A", fontSize: "13px" }}>{bookingData.email}</p>
                  <p style={{ color: "#8A8A8A", fontSize: "13px" }}>{bookingData.phone}</p>
                </div>
                <div>
                  <span style={labelStyle}>Scheduled For</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={14} style={{ color: "#39FF14" }} />
                    <p className="text-white text-sm">{formattedDate}</p>
                  </div>
                  <p style={{ color: "#39FF14", fontSize: "13px", fontWeight: 600, marginLeft: "22px" }}>at {bookingData.pickupTime}</p>
                </div>
              </div>

              {/* Right Column: Vehicle & Address */}
              <div className="space-y-6">
                <div>
                  <span style={labelStyle}>Vehicle Information</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Car size={14} style={{ color: "#39FF14" }} />
                    <p className="text-white font-medium">{bookingData.make} {bookingData.carModel}</p>
                  </div>
                  <p style={{ color: "#8A8A8A", fontSize: "13px", marginLeft: "22px" }}>Plate: {bookingData.licensePlate} ({bookingData.year})</p>
                </div>
                <div>
                  <span style={labelStyle}>Pickup Location</span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={14} style={{ color: "#39FF14" }} />
                    <p className="text-white text-sm">{bookingData.pickupAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Garage Block */}
            <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={labelStyle}>Assigned Garage</span>
              <p className="text-white font-bold mt-1">{selectedGarage.name}</p>
              <p style={{ color: "#8A8A8A", fontSize: "13px" }}>{selectedGarage.address}</p>
              <p style={{ color: "#8A8A8A", fontSize: "13px" }}>{selectedGarage.phone}</p>
            </div>

            {/* Symptoms Block */}
            {bookingData.symptoms && (
              <div className="mt-6">
                <span style={labelStyle}>Service Details</span>
                <div className="flex items-start gap-2 mt-1">
                  <FileText size={14} style={{ color: "#39FF14", marginTop: "3px" }} />
                  <p style={{ color: "#8A8A8A", fontSize: "13px", lineHeight: "1.6" }}>{bookingData.symptoms}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Next Steps Card ── */}
        <Card style={{ ...sectionCardStyle, background: "rgba(57,255,20,0.03)" }}>
          <CardContent className="pt-6">
            <span style={labelStyle}>Next Steps</span>
            <ul className="mt-4 space-y-3">
              {[
                `A confirmation email has been sent to ${bookingData.email}`,
                "The garage will contact you shortly to verify the pickup",
                "Ensure your vehicle is accessible at the provided address"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div style={{ width: "6px", height: "6px", background: "#39FF14", borderRadius: "50%", marginTop: "7px" }} />
                  <p style={{ color: "#FFFFFF", fontSize: "13px" }}>{text}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ── Home Action ── */}
        <div className="flex justify-center mt-10 mb-12">
          <Button
            onClick={handleBackHome}
            size="lg"
            className="group flex items-center gap-3 uppercase font-bold tracking-widest transition-all duration-300"
            style={{
              background: "transparent",
              color: "#39FF14",
              border: "1px solid #39FF14",
              borderRadius: "10px",
              padding: "0 40px",
              minHeight: "56px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 25px rgba(57,255,20,0.4)";
              e.currentTarget.style.background = "rgba(57,255,20,0.08)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Home size={18} />
            Return Home
          </Button>
        </div>

      </div>
    </div>
  );
}