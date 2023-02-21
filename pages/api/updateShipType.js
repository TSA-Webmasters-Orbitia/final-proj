import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      res.status(500).json({ message: "Route Not Found" });
      return;
    case "POST":
      let body = JSON.parse(req.body);
      let updatedF = await prisma.application.update({
        where: {
          id: body.id,
        },
        data: {
          shipType: body.newShipType,
        },
      });
      res.status(200).json({ application: updatedF });
  }
}
