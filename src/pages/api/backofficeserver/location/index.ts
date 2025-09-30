// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("OK GET");
  } else if (method === "POST") {
    const { name, companyId } = req.body;
    const isValid = name;
    if (!isValid) return res.status(401).send("Required field");
    const location = await prisma.location.create({
      data: { name, companyId },
    });
    res.status(200).json({ location });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const existLocation = await prisma.location.findFirst({
      where: { id: id },
    });
    if (!existLocation) return res.status(404).send("Location Not Found");
    const location = await prisma.location.update({
      data: payload,
      where: { id: id },
    });
    res.status(200).json({ location });
  } else if (method === "DELETE") {
    const locationId = Number(req.query.id);
    const exist = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!exist) return res.status(404).send("Location Not Found");
    await prisma.location.update({
      data: { isArchived: true },
      where: { id: locationId },
    });
    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
