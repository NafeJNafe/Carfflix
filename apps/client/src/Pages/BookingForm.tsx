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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import type { Garage, BookingData } from "@/types";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 35 }, (_, i) => CURRENT_YEAR - i);

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

  const handleInputChange = (
    field: keyof BookingData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

      sessionStorage.setItem(
        "appointmentId",
        appointmentResponse.data.appointment.id.toString(),
      );
      sessionStorage.setItem("bookingData", JSON.stringify(formData));

      navigate("/confirmation");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      alert(
        error.response?.data?.error ||
          "Failed to create booking. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!selectedGarage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/garages")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Schedule Your Pickup</CardTitle>
            <CardDescription>
              Fill in your details to complete the booking
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="juan@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+34 612 345 678"
              />
            </div>
            <div>
              <Label htmlFor="pickupAddress">Pickup Address *</Label>
              <Input
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) =>
                  handleInputChange("pickupAddress", e.target.value)
                }
                placeholder="Calle Mayor 123, Madrid"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  placeholder="Toyota"
                />
              </div>
              <div>
                <Label htmlFor="carModel">Model *</Label>
                <Input
                  id="carModel"
                  value={formData.carModel}
                  onChange={(e) =>
                    handleInputChange("carModel", e.target.value)
                  }
                  placeholder="Corolla"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year *</Label>
                <Select
                  value={formData.year.toString()}
                  onValueChange={(value) =>
                    handleInputChange("year", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="licensePlate">License Plate *</Label>
                <Input
                  id="licensePlate"
                  value={formData.licensePlate}
                  onChange={(e) =>
                    handleInputChange(
                      "licensePlate",
                      e.target.value.toUpperCase(),
                    )
                  }
                  placeholder="1234ABC"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pickup Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pickupDate">Pickup Date *</Label>
              <Input
                id="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  handleInputChange("pickupDate", e.target.value)
                }
                min={
                  new Date(Date.now() + 86400000).toISOString().split("T")[0]
                }
              />
            </div>
            <div>
              <Label htmlFor="pickupTime">Pickup Time *</Label>
              <Select
                value={formData.pickupTime}
                onValueChange={(value) =>
                  handleInputChange("pickupTime", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Review Your Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <strong>Garage:</strong> {selectedGarage.name}
              </p>
              <p>
                <strong>Address:</strong> {selectedGarage.address}
              </p>
              <p>
                <strong>Details:</strong> {formData.symptoms}
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <Label
                htmlFor="confirm"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that the information provided is correct
              </Label>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={!isFormValid() || loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Creating booking..." : "Schedule Pickup"}
        </Button>
      </div>
    </div>
  );
}
