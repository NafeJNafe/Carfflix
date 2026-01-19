import express from 'express'
import cors from 'cors'
import { createClient, getClients } from './controllers/clientController.ts'
import { createVehicle, getVehicles } from './controllers/vehicleController.ts'
import { createGarage, getGarages } from './controllers/garageController.ts'
import {
  createAppointment,
  getAppointments,
} from './controllers/appointmentController.ts'

const app = express()

// Configuración de CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Puerto de Vite
    credentials: true,
  })
)

app.use(express.json())

// Client endpoints
app.post('/clients', createClient)
app.get('/clients', getClients)

// Vehicle endpoints
app.post('/vehicles', createVehicle)
app.get('/vehicles', getVehicles)

// Garage endpoints
app.post('/garages', createGarage)
app.get('/garages', getGarages)

// Appointment endpoints
app.post('/appointments', createAppointment)
app.get('/appointments', getAppointments)

export default app
