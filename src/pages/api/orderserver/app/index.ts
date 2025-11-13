import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const { tableId } = req.query;
    console.log(tableId);

    if (!tableId) return res.status(404).send("not found");
    const table = await prisma.table.findFirst({
      where: { id: Number(tableId), isArchived: false },
    });
    if (!table) return res.status(404).send("not found");

    const location = await prisma.location.findFirst({
      where: { id: table.locationId },
    });

    const company = await prisma.company.findFirst({
      where: { id: location?.companyId },
    });
    const companyId = company?.id;

    const allMenuCategories = await prisma.menuCategory.findMany({
      where: { companyId: company?.id, isArchived: false },
    });
    const allmenuCatgoryIds = allMenuCategories.map((item) => item.id);

    const disableMenuCategoryIds = (
      await prisma.disableLocationMenuCategory.findMany({
        where: {
          menuCatgoryId: { in: allmenuCatgoryIds },
          locationId: location?.id,
        },
      })
    ).map((item) => item.menuCatgoryId);

    const menuCategories = allMenuCategories.filter(
      (item) => !disableMenuCategoryIds.includes(item.id)
    );
    ////changes allmenuCatoryIds
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
    });

    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    const disableMenuIds = (
      await prisma.disableLocationMenu.findMany({
        where: { menuId: { in: menuIds }, locationId: location?.id },
      })
    ).map((item) => item.menuId);
    const menus = (
      await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      })
    ).filter((item) => !disableMenuIds.includes(item.id));

    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menus.map((item) => item.id) } },
    });
    const addonCategoryIds = menuAddonCategories.map(
      (item) => item.addonCategoryId
    );
    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds } },
    });
    const addons = await prisma.addon.findMany({
      where: { addonCategoryId: { in: addonCategoryIds } },
    });

    res.status(200).json({
      company,
      locations: [location],
      tables: [table],
      menuCategories,
      disableLocationMenuCategories: [],
      disableLocationMenus: [],
      menus,
      menuCategoryMenus,
      addonCategories,
      menuAddonCategories,
      addons,
    });
  } else {
    res.status(405).send("Invalid Method");
  }
}
