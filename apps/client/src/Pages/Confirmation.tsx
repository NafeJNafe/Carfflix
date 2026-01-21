import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";
import type { Garage, BookingData } from "@/types";

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

  if (!bookingData || !selectedGarage) {
    return null;
  }

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
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-gray-600">
              Your pickup has been scheduled successfully
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Booking ID: #{appointmentId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-semibold">{bookingData.name}</p>
                  <p className="font-semibold">{bookingData.phone}</p>
                  <p className="font-semibold">{bookingData.email}</p>
                  <p className="text-sm text-gray-500 mt-2">Date & Time</p>
                  <p className="font-semibold">
                    {formattedDate} at {bookingData.pickupTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Address</p>
                  <p className="font-semibold">{bookingData.pickupAddress}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Selected Garage</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{selectedGarage.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedGarage.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedGarage.phone}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Vehicle</p>
                <p className="font-semibold">
                  {bookingData.make} {bookingData.carModel} ({bookingData.year})
                </p>
                <p className="text-sm text-gray-600">
                  License Plate: {bookingData.licensePlate}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Service Details</p>
                <p className="text-gray-700">{bookingData.symptoms}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-blue-100">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    You'll receive an email confirmation at{" "}
                    <strong>{bookingData.email}</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    The garage will contact you to confirm pickup details
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Make sure your car is accessible at the pickup address
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleBackHome}
              className="bg-blue-600 text-white border border-blue-700 px-6 py-3 rounded-lg font-semibold transition duration-200 hover:bg-blue-900 hover:border-black hover:cursor-pointer transform hover:scale-125"
              size="lg"
              variant="outline"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
