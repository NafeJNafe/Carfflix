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
import { ArrowLeft } from "lucide-react";

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
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                What's wrong with your car, or what kind of maintenance do you
                need?
              </CardTitle>
              <CardDescription>
                Fill in at least one of the fields below. You can describe
                symptoms, request maintenance, or both.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="symptoms">Symptoms (optional)</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., The car makes a squeaking noise when I brake, the steering wheel vibrates at high speeds..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={5}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {symptoms.length}/500 characters
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">and/or</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="maintenance">Maintenance (optional)</Label>
                  <Textarea
                    id="maintenance"
                    placeholder="e.g., Oil change, tire rotation, brake inspection, air filter replacement..."
                    value={maintenance}
                    onChange={(e) => setMaintenance(e.target.value)}
                    rows={5}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {maintenance.length}/500 characters
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!isValid}
                  className="w-full"
                  size="lg"
                >
                  Continue to Garage Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
