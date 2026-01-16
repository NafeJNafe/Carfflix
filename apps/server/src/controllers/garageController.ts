import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma.ts'

export const createGarage = async (req: Request, res: Response) => {
  try {
    const { name, address, latitude, longitude, phone, email } = req.body

    const garage = await prisma.garage.create({
      data: {
        name,
        address,
        latitude,
        longitude,
        phone,
        email,
      },
    })

    res.status(201).json({
      message: 'Garage created successfully',
      garage,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create garage' })
  }
}

export const getGarages = async (_req: Request, res: Response) => {
  try {
    const garages = await prisma.garage.findMany()

    res.status(200).json({
      message: 'Garages fetched successfully',
      garages,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch garages' })
  }
}
