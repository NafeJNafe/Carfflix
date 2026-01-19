import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Clock, MapPin } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🚗 CARFFLIX
            </h1>
            <p className="text-2xl text-gray-700 mb-2">
              Car pickup and garage service, without leaving home
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We pick up your car, take it to a trusted garage, and return it
              when it's ready. No waiting, no hassle.
            </p>

            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/symptoms")}
            >
              Book a Pickup
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>1. Describe Your Issue</CardTitle>
                  <CardDescription>
                    Tell us what's wrong with your car in a few words
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>2. Choose a Garage</CardTitle>
                  <CardDescription>
                    Select from nearby trusted garages
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>3. Schedule Pickup</CardTitle>
                  <CardDescription>
                    Pick a date and time that works for you
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
