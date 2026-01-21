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
                  <Label htmlFor="symptoms">Symptoms:</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., The car makes a squeaking noise when I brake, the steering wheel vibrates at high speeds..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={5}
                    className={`mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition hover:bg-blue-100 hover:scale-102 hover:shadow-md ${
                      symptoms ? "bg-blue-200 ring-2 ring-blue-500" : ""
                    }`}
                  />

                  <p className="text-sm text-black mt-2 ">
                    {symptoms.length}/500 characters
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 font-semibold text-black">
                      and/or
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="maintenance">Maintenance:</Label>
                  <Textarea
                    id="maintenance"
                    placeholder="e.g., Oil change, brake check, general inspection..."
                    value={maintenance}
                    onChange={(e) => setMaintenance(e.target.value)}
                    rows={5}
                    className={`mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition hover:scale-102 hover:bg-blue-100 hover:shadow-md ${
                      maintenance ? "bg-blue-200 ring-2 ring-blue-500" : ""
                    }`}
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    {maintenance.length}/500 characters
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleContinue}
                    disabled={!isValid}
                    className="bg-blue-600 text-white border border-blue-700 px-6 py-3 rounded-lg font-semibold transition duration-200 hover:bg-blue-900 hover:border-black hover:cursor-pointer transform hover:scale-125"
                    size="lg"
                  >
                    Continue to Garage Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
