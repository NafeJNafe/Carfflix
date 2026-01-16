import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma.ts'

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body

    const client = await prisma.client.create({
      data: { name, email, phone, address },
    })

    res.status(201).json({
      message: 'Client created successfully',
      client,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create client' })
  }
}

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany()

    res.status(200).json({
      message: 'Clients fetched successfully',
      clients,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch clients' })
  }
}
