import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma.ts'

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const {
      clientId,
      vehicleId,
      garageId,
      pickupDate,
      pickupTime,
      pickupAddress,
      symptoms,
      status,
    } = req.body

    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        vehicleId,
        garageId,
        pickupDate,
        pickupTime,
        pickupAddress,
        symptoms,
        status,
      },
    })

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create appointment' })
  }
}

export const getAppointments = async (_req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany()

    res.status(200).json({
      message: 'Appointments fetched successfully',
      appointments,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch appointments' })
  }
}
