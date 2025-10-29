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
    const { name, price, addonCategoryId } = req.body;
    const isValid = name || price === undefined || addonCategoryId.length;
    if (isValid) return res.status(400).send("Addon Cannot Create");
    const addon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });

    res.status(200).json({ addon });
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const exist = await prisma.addon.findFirst({ where: { id: id } });
    if (!exist) return res.status(400).send("Addon Cannot Find");
    const addon = await prisma.addon.update({
      data: { id, name, price, addonCategoryId },
      where: { id },
    });
    res.status(200).json({ addon });
  } else if (method === "DELETE") {
    const addonId = Number(req.query.id);
    const exist = await prisma.addon.findFirst({
      where: { id: addonId },
    });
    if (!exist) return res.status(400).send("Bad request");
    await prisma.addon.update({
      data: { isArchived: true },
      where: { id: addonId },
    });

    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
