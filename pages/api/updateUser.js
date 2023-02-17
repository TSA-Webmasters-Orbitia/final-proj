import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient
    switch (req.method) {
        case 'GET':
            res.status(500).json({message: "Route Not Found"})
            return;
        case 'POST':
            let body = JSON.parse(req.body)
            let user = await prisma.user.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password
                }
            })
            res.status(200).json({user: user})
            return;
    }
}