import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    switch (req.method) {
        case 'GET':
            let flights = await prisma.application.findMany()
            res.status(200).json({flights: flights})
            return;
        case 'POST':
            res.status(500).json({ message: "Route Not Found!" })
            return;
    }
}