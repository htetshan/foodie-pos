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
    const isValid = name && isAvailable !== undefined && companyId;
    if (!isValid) {
      return res.status(400).send("Bad request");
    }

    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const existMenuCategory = await prisma.menuCategory.findFirst({
      where: { id: id },
    });
    if (!existMenuCategory) return res.status(400).send("Bad request");
    if (payload.name === "")
      return res.status(400).send("Bad request name need");
    const menuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id: id },
    });
    res.status(200).json({ menuCategory });
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);
    const exist = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!exist) return res.status(400).send("Delete Error");
    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id: menuCategoryId },
    });
    res.status(200).send("OK DELETE");
  }
  res.status(405).send("Invalid method");
}
