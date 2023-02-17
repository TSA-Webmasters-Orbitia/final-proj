import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient
    switch (req.method) {
        case 'GET':
            let users = await prisma.user.findMany()
            res.status(200).json({users: users})
            return;
        case 'POST':
            res.status(500).json({ message: "Route Not Found!" })
            return;
    }
}