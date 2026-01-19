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
import { ArrowLeft, MapPin, Phone } from "lucide-react";
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

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-lg">Loading garages...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/symptoms")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Choose a Garage</CardTitle>
              <CardDescription>
                Select a garage from the list below
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 mb-6">
            {garages.map((garage) => (
              <Card
                key={garage.id}
                className={`cursor-pointer transition-all ${
                  selectedGarage?.id === garage.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedGarage(garage)}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {garage.name}
                      </h3>
                      <div className="flex items-start text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        <span>{garage.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{garage.phone}</span>
                      </div>
                    </div>

                    <Button
                      variant={
                        selectedGarage?.id === garage.id ? "default" : "outline"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGarage(garage);
                      }}
                    >
                      {selectedGarage?.id === garage.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {garages.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-600">
                  No garages available at the moment.
                </p>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handleContinue}
            disabled={!selectedGarage}
            className="w-full"
            size="lg"
          >
            Continue to Booking Form
          </Button>
        </div>
      </div>
    </>
  );
}
