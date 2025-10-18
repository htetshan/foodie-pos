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
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request");
    const menu = await prisma.menu.create({ data: { name, price } });
    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );
    //const menuCategoryMenu=await prisma.menuCategoryMenu.create({data:{menuId:menu.id,menuCategoryId:menuCategoryIds}})
    res.status(200).json({ menu, menuCategoryMenu });
  } else if (method === "PUT") {
    console.log(req.body);

    const { id, isAvailable, selectedLocationId, ...payload } = req.body;
    const exist = await prisma.menu.findFirst({ where: { id: id } });
    if (!exist) return res.status(400).send("Menu Cannot Find");
    const menu = await prisma.menu.update({ data: payload, where: { id } });
    if (selectedLocationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenu.create({
          data: { menuId: id, locationId: selectedLocationId },
        });
      } else {
        const disableMenu = await prisma.disableLocationMenu.findFirst({
          where: { menuId: id, locationId: selectedLocationId },
        });
        await prisma.disableLocationMenu.delete({
          where: { id: disableMenu?.id },
        });
      }
    }
    const location = await prisma.location.findFirst({
      where: { id: selectedLocationId },
    });
    const companyId = location?.companyId;
    const menuCategory = await prisma.menuCategory.findMany({
      where: { companyId },
    });
    const menuCategoryIds = menuCategory.map((itemId) => itemId.id);
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const menuIds = menuCategoryMenu.map((item) => item.menuId);
    const disableLocationMenus = await prisma.disableLocationMenu.findMany({
      where: { menuId: { in: menuIds } },
    });
    res.status(200).json({ menu, disableLocationMenus });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const exist = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!exist) return res.status(400).send("Menu Cannot Find");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    res.status(200).send("OK DELETE");
  }
  res.status(405).send("Invalid method");
}
