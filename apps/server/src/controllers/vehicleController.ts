import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma.ts'

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { clientId, make, carModel, year, licensePlate } = req.body

    const vehicle = await prisma.vehicle.create({
      data: {
        clientId,
        make,
        carModel,
        year,
        licensePlate,
      },
    })

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create vehicle' })
  }
}

export const getVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany()

    res.status(200).json({
      message: 'Vehicles fetched successfully',
      vehicles,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch vehicles' })
  }
}
