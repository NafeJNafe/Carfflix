import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Car, CalendarClock, ClipboardList } from "lucide-react";
import api from "@/lib/api";
import type { Garage, BookingData } from "@/types";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 35 }, (_, i) => CURRENT_YEAR - i);

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = {
  color: "#39FF14",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "8px",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#0D0D0D",
  border: "1px solid rgba(57,255,20,0.15)",
  borderRadius: "16px",
  marginBottom: "20px",
};

export default function BookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    make: "",
    carModel: "",
    year: CURRENT_YEAR,
    licensePlate: "",
    symptoms: "",
    garageId: 0,
    pickupDate: "",
    pickupTime: "",
  });

  const [confirmed, setConfirmed] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const symptoms = sessionStorage.getItem("symptoms") || "";
    const garageStr = sessionStorage.getItem("selectedGarage");

    if (!garageStr) {
      navigate("/garages");
      return;
    }

    const garage = JSON.parse(garageStr) as Garage;
    setSelectedGarage(garage);
    setFormData((prev) => ({
      ...prev,
      symptoms,
      garageId: garage.id,
    }));
  }, [navigate]);

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Helper to get dynamic styles based on filled/active state
   * Added outline and shadow resets to kill the "residual blue"
   */
  const getDynamicInputStyle = (value: string | number | undefined, isFocused: boolean = false): React.CSSProperties => {
    const isFilled = value !== undefined && value !== "" && value !== 0;
    
    return {
      background: isFilled ? "rgba(57,255,20,0.05)" : "#111111",
      border: isFocused || isFilled 
        ? "1px solid rgba(57,255,20,0.5)" 
        : "1px solid rgba(255,255,255,0.08)",
      borderRadius: "10px",
      color: "#FFFFFF",
      fontSize: "14px",
      padding: "12px 14px",
      width: "100%",
      outline: "none", // Kills default browser outline
      boxShadow: isFocused ? "0 0 0 1px rgba(57,255,20,0.2)" : "none", // Green glow instead of blue
      transition: "all 200ms ease-in-out",
    };
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.pickupAddress.trim() &&
      formData.make.trim() &&
      formData.carModel.trim() &&
      formData.year &&
      formData.licensePlate.trim() &&
      formData.pickupDate &&
      formData.pickupTime &&
      confirmed
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setLoading(true);
    try {
      const clientResponse = await api.post("/clients", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.pickupAddress,
      });
      const clientId = clientResponse.data.client.id;

      const vehicleResponse = await api.post("/vehicles", {
        clientId,
        make: formData.make,
        carModel: formData.carModel,
        year: formData.year,
        licensePlate: formData.licensePlate,
      });
      const vehicleId = vehicleResponse.data.vehicle.id;

      const appointmentResponse = await api.post("/appointments", {
        clientId,
        vehicleId,
        garageId: formData.garageId,
        pickupDate: new Date(formData.pickupDate).toISOString(),
        pickupTime: formData.pickupTime,
        pickupAddress: formData.pickupAddress,
        symptoms: formData.symptoms,
        status: "PENDING",
      });

      sessionStorage.setItem("appointmentId", appointmentResponse.data.appointment.id.toString());
      sessionStorage.setItem("bookingData", JSON.stringify(formData));
      navigate("/confirmation");
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedGarage) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10" style={{ backgroundColor: "#000000" }}>
      
      {/* ── Navigation ── */}
      <div className="w-full" style={{ maxWidth: "720px", marginBottom: "24px" }}>
        <button
          onClick={() => navigate("/garages")}
          className="flex items-center gap-2 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 outline-none"
          style={{ color: "#8A8A8A", fontSize: "13px" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#39FF14")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </div>

      {/* ── Header ── */}
      <div className="w-full mb-6" style={{ maxWidth: "720px" }}>
        <div style={{ marginBottom: "10px" }}>
          <span className="font-bold uppercase" style={{ color: "#39FF14", fontSize: "10px", letterSpacing: "0.15em", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.3)", borderRadius: "999px", padding: "4px 12px" }}>
            Step 3 of 3 · Appointment Scheduling
          </span>
        </div>
        <h1 className="font-bold" style={{ color: "#FFFFFF", fontSize: "clamp(1.3rem, 4vw, 1.6rem)" }}>
          Schedule Your Pickup
        </h1>
      </div>

      <div className="w-full" style={{ maxWidth: "720px" }}>

        {/* ── Personal Info ── */}
        <Card style={sectionCardStyle}>
          <CardHeader style={{ paddingBottom: "4px" }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: "36px", height: "36px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "50%" }}>
                <User size={16} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ paddingTop: "8px" }}>
            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />
            <div className="flex flex-col gap-5">
              {[
                { id: "name", label: "Name and Surname *", field: "name" },
                { id: "email", label: "Email *", field: "email", type: "email" },
                { id: "phone", label: "Phone *", field: "phone", type: "tel" },
                { id: "pickupAddress", label: "Pickup Address *", field: "pickupAddress" },
              ].map((input) => (
                <div key={input.id}>
                  <Label htmlFor={input.id} style={labelStyle}>{input.label}</Label>
                  <Input
                    id={input.id}
                    type={input.type || "text"}
                    value={formData[input.field as keyof BookingData] as string}
                    onChange={(e) => handleInputChange(input.field as keyof BookingData, e.target.value)}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none" // Hard reset for shadcn defaults
                    style={getDynamicInputStyle(formData[input.field as keyof BookingData] as string)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Vehicle Info ── */}
        <Card style={sectionCardStyle}>
          <CardHeader style={{ paddingBottom: "4px" }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: "36px", height: "36px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "50%" }}>
                <Car size={16} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>Vehicle Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ paddingTop: "8px" }}>
            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="make" style={labelStyle}>Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  style={getDynamicInputStyle(formData.make)}
                />
              </div>
              <div>
                <Label htmlFor="carModel" style={labelStyle}>Model *</Label>
                <Input
                  id="carModel"
                  value={formData.carModel}
                  onChange={(e) => handleInputChange("carModel", e.target.value)}
                  style={getDynamicInputStyle(formData.carModel)}
                />
              </div>
              <div>
                <Label htmlFor="year" style={labelStyle}>Year *</Label>
                <Select value={formData.year?.toString() ?? ""} onValueChange={(v) => handleInputChange("year", parseInt(v))}>
                  <SelectTrigger style={{ ...getDynamicInputStyle(formData.year), minHeight: "46px" }}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent style={{ background: "#111111", border: "1px solid rgba(57,255,20,0.25)", borderRadius: "10px" }}>
                    {YEARS.map((y) => <SelectItem key={y} value={y.toString()} className="text-white focus:bg-[#39FF14]/10 focus:text-[#39FF14]">{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="licensePlate" style={labelStyle}>License Plate *</Label>
                <Input
                  id="licensePlate"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange("licensePlate", e.target.value.toUpperCase())}
                  style={getDynamicInputStyle(formData.licensePlate)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Pickup Date & Time ── */}
        <Card style={sectionCardStyle}>
          <CardHeader style={{ paddingBottom: "4px" }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: "36px", height: "36px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "50%" }}>
                <CalendarClock size={16} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>Pickup Date & Time</CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ paddingTop: "8px" }}>
            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />
            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="pickupDate" style={labelStyle}>Pickup Date *</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  style={{ ...getDynamicInputStyle(formData.pickupDate), colorScheme: "dark" }}
                />
              </div>
              <div>
                <Label htmlFor="pickupTime" style={labelStyle}>Pickup Time *</Label>
                <Select value={formData.pickupTime} onValueChange={(v) => handleInputChange("pickupTime", v)}>
                  <SelectTrigger style={{ ...getDynamicInputStyle(formData.pickupTime), minHeight: "46px" }}>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent style={{ background: "#111111", border: "1px solid rgba(57,255,20,0.25)", borderRadius: "10px" }}>
                    {TIME_SLOTS.map((t) => <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Review ── */}
        <Card style={sectionCardStyle}>
          <CardHeader style={{ paddingBottom: "4px" }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: "36px", height: "36px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "50%" }}>
                <ClipboardList size={16} style={{ color: "#39FF14" }} />
              </div>
              <CardTitle style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700 }}>Review Your Booking</CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ paddingTop: "8px" }}>
            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />
            <div className="flex flex-col gap-3 mb-6">
              {[
                { label: "Client", value: `${formData.name}, ${formData.email}, ${formData.phone}` },
                { label: "Vehicle", value: `${formData.make} ${formData.carModel}, ${formData.year}` },
                { label: "Pickup", value: `${formData.pickupDate} at ${formData.pickupTime}` },
                { label: "Garage", value: selectedGarage.name },
                { label: "Details", value: formData.symptoms || "—" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span style={{ color: "#39FF14", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", minWidth: "68px" }}>{item.label}</span>
                  <span style={{ color: "#8A8A8A", fontSize: "13px" }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px dashed rgba(57,255,20,0.15)", marginBottom: "20px" }} />

            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(c) => setConfirmed(c as boolean)}
                className={cn(
                  "mt-1 transition-all duration-200 border-2",
                  "border-[#39FF14] data-[state=checked]:bg-[#39FF14] data-[state=checked]:text-black"
                )}
              />
              <Label htmlFor="confirm" className="cursor-pointer" style={{ color: confirmed ? "#FFFFFF" : "#8A8A8A", fontSize: "13px", lineHeight: "1.5" }}>
                I confirm that the information provided is correct
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* ── Submit ── */}
        <div className="mt-2 mb-10">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
            size="lg"
            className="w-full uppercase font-bold tracking-widest transition-all duration-200"
            style={{
              background: "transparent",
              color: isFormValid() && !loading ? "#39FF14" : "#444",
              border: isFormValid() && !loading ? "1px solid #39FF14" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              minHeight: "52px",
            }}
            onMouseEnter={(e) => {
              if (!isFormValid() || loading) return;
              e.currentTarget.style.boxShadow = "0 0 16px rgba(57,255,20,0.35)";
              e.currentTarget.style.background = "rgba(57,255,20,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {loading ? "Creating booking..." : "Schedule Pickup →"}
          </Button>
        </div>
      </div>
    </div>
  );
}