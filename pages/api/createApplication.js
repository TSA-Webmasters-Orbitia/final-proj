import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    switch (req.method) {
        case 'GET':
            res.status(500).json({ message: "Route Not Found!" })
            return;
        case 'POST':
            let body = JSON.parse(req.body)
            let application = await prisma.application.create({
                data: {
                    takeOff: body.takeOff,
                    landing: body.landing,
                    shipType: body.shipType,
                    astronautId: body.astronautId,
                }
            })
            res.status(200).json({application: application})
            return;
    }
}