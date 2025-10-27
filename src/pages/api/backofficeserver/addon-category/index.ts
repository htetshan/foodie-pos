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
    res.status(200).send("OK POST");
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds, companyId } = req.body;
    const exist = await prisma.addonCategory.findFirst({ where: { id: id } });
    if (!exist) return res.status(400).send("Bad request");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id: id },
    });
    if (menuIds) {
      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { addonCategoryId: id },
      });
      //toRemove
      const toRemove = menuAddonCategories.filter(
        (item) => !menuIds.includes(item.menuId)
      );
      if (toRemove.length) {
        await prisma.$transaction(
          toRemove.map((item) =>
            prisma.menuAddonCategory.delete({
              where: { id: item.id },
            })
          )
        );
      }
      //toAdd
      const toAdd = menuIds.filter(
        (menuId: number) =>
          !menuAddonCategories.find((item) => item.menuId === menuId)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((itemId: number) =>
            prisma.menuAddonCategory.create({
              data: { menuId: itemId, addonCategoryId: id },
            })
          )
        );
      }
    }
    const MenuCatgory = await prisma.menuCategory.findMany({
      where: { companyId },
    });
    const menuCategoryIds = MenuCatgory.map((item) => item.id);
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const existingMenuIds = menuCategoryMenus.map((item) => item.menuId);
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: existingMenuIds } },
    });
    res.status(200).json({ addonCategory, menuAddonCategories });

    res.status(200).send("OK PUT");
  } else if (method === "DELETE") {
    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
