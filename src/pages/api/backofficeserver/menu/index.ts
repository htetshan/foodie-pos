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
    const { name, price, menuCategoryIds, assetUrl } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request");
    const menu = await prisma.menu.create({ data: { name, price, assetUrl } });
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );
    res.status(200).json({ menu, menuCategoryMenus });
  } else if (method === "PUT") {
    const { id, isAvailable, selectedLocationId, menuCategoryIds, ...payload } =
      req.body;
    const exist = await prisma.menu.findFirst({ where: { id: id } });
    if (!exist) return res.status(400).send("Menu Cannot Find");
    const menu = await prisma.menu.update({ data: payload, where: { id } });

    //isAvailable control logic
    if (selectedLocationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenu.create({
          data: { menuId: id, locationId: selectedLocationId },
        });
      } else {
        const disableMenu = await prisma.disableLocationMenu.findFirst({
          where: { menuId: id, locationId: selectedLocationId },
        });
        if (disableMenu) {
          await prisma.disableLocationMenu.delete({
            where: { id: disableMenu.id },
          });
        }
      }
    }

    //find disableLocationMenus table logic
    const location = await prisma.location.findFirst({
      where: { id: selectedLocationId },
    });
    const companyId = location?.companyId;
    const menuCategory = await prisma.menuCategory.findMany({
      where: { companyId },
    });
    const existingmenuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: {
        menuCategoryId: { in: menuCategory.map((itemId) => itemId.id) },
      },
    });
    const menuIds = existingmenuCategoryMenu.map((item) => item.menuId);
    const disableLocationMenus = await prisma.disableLocationMenu.findMany({
      where: { menuId: { in: menuIds } },
    });

    //toRemove or toAdd logic for menuCategoryMenu
    if (menuCategoryIds) {
      const menuCategoriesMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });
      //toRemove
      const toRemove = menuCategoriesMenus.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );
      if (toRemove.length) {
        await prisma.$transaction(
          toRemove.map((item) =>
            prisma.menuCategoryMenu.delete({ where: { id: item.id } })
          )
        );
        /*same logic compare with transaction
         await prisma.menuCategoryMenu.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        }); */
      }
      //toAdd
      const toAdd = menuCategoryIds.filter(
        (menuCategoryId: number) =>
          !menuCategoriesMenus.find(
            (item) => item.menuCategoryId === menuCategoryId
          )
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((itemId: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuId: id, menuCategoryId: itemId },
            })
          )
        );
      }
    }
    //find menuCategoryMenu table logic
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuId: id },
    });
    res.status(200).json({ menu, menuCategoryMenus, disableLocationMenus });
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
