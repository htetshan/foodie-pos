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
    const isValid = name && companyId;
    if (!isValid) {
      return res.status(400).send("Bad request");
    }

    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });
    res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, selectedLocationId, isAvailable, ...payload } = req.body;
    const existMenuCategory = await prisma.menuCategory.findFirst({
      where: { id: id },
    });
    if (!existMenuCategory) return res.status(400).send("Bad request");
    const menuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id: id },
    });

    if (selectedLocationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenuCategory.create({
          data: { menuCatgoryId: id, locationId: selectedLocationId },
        });
      } else if (isAvailable === true) {
        const disableId = await prisma.disableLocationMenuCategory.findFirst({
          where: { menuCatgoryId: id, locationId: selectedLocationId },
        });
        disableId &&
          (await prisma.disableLocationMenuCategory.delete({
            where: { id: disableId?.id },
          }));
      }
    }
    const location = await prisma.location.findFirst({
      where: { id: selectedLocationId },
    });

    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: location?.companyId },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    //my error code line is :const menuCategoryIds = menuCategories.map((item) => item.companyId);

    const disableLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany({
        where: { menuCatgoryId: { in: menuCategoryIds } },
      });

    res.status(200).json({ menuCategory, disableLocationMenuCategories });
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
