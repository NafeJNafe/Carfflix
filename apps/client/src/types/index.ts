export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Vehicle {
  id: number;
  clientId: number;
  make: string;
  carModel: string;
  year: number;
  licensePlate: string;
  createdAt: string;
}

export interface Garage {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  createdAt: string;
}

export type AppointmentStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Appointment {
  id: number;
  clientId: number;
  vehicleId: number;
  garageId: number;
  pickupDate: string;
  pickupTime: string;
  pickupAddress: string;
  symptoms: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  make: string;
  carModel: string;
  year: number;
  licensePlate: string;
  symptoms: string;
  garageId: number;
  pickupDate: string;
  pickupTime: string;
}
