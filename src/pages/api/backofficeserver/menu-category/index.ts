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
    const { name, isAvailable, companyId } = req.body;
    console.log("comapnyId:", companyId);

    const isValid = !name || isAvailable === undefined || !companyId;
    if (isValid) {
      return res.status(400).send("Bad request");
    }
    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    console.log(
      "i want to know api menucategory payload is what type eg.obj or array or raw when update:",
      payload
    );

    const menuCategory = await prisma.menuCategory.findFirst({
      where: { id: id },
    });
    if (!menuCategory) return res.status(400).send("Bad request");
    if (payload.name === "")
      return res.status(400).send("Bad request name need");
    const updateMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id: id },
    });
    res.status(200).json({ updateMenuCategory });
  } else if (method === "DELETE") {
    res.status(200).send("OK DELETE");
  }
  res.status(405).send("Invalid method");
}
