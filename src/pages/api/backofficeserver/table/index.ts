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
    const { name, locationId } = req.body;
    const isValid = name && locationId.length;
    if (isValid) return res.status(400).send("Table Cannot Create");
    const table = await prisma.table.create({
      data: { name, locationId },
    });

    res.status(200).json({ table });
  } else if (method === "PUT") {
    const { id, name, locationId } = req.body;
    console.log(locationId);

    const exist = await prisma.table.findFirst({ where: { id: id } });
    if (!exist) return res.status(400).send("Table Cannot Find");
    const table = await prisma.table.update({
      data: { id, name, locationId },
      where: { id },
    });
    res.status(200).json({ table });
  } else if (method === "DELETE") {
    const tableId = Number(req.query.id);
    const exist = await prisma.table.findFirst({
      where: { id: tableId },
    });
    if (!exist) return res.status(400).send("Bad request");
    await prisma.table.update({
      data: { isArchived: true },
      where: { id: tableId },
    });

    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
