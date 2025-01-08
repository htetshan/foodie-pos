// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  const session = await getSession({ req });
  if (session) {
    const { user } = session;
    if (user) {
      const userEmail = user.email as string;
      const userName = user.name as string;
      const userFromDb = await prisma.user.findFirst({
        where: { email: userEmail },
      });
      if (userFromDb) {
        console.log("user has in db");
        const userId = userFromDb.id;
        //user can be two companys owned but in this modelling one company find return {}
        const company = await prisma.company.findFirst({
          where: { id: userId },
        });
        const companyId = company?.id;
        //findMany use retrun [{},{}], so map this []
        const locations = await prisma.location.findMany({
          where: { id: companyId },
        });
        const locationId = locations.map((item) => item.id);
        const tables = await prisma.table.findMany({
          where: { id: { in: locationId } },
        });
        const menuCategories = await prisma.menuCategory.findMany({
          where: { companyId },
        });

        const menuCategoryId = menuCategories.map((item) => item.id);
        const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCategoryId } },
        });
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuCategoryMenu.map((item) => item.menuId) } },
        });
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menus.map((item) => item.id) } },
        });
        const addonCategories = await prisma.addonCategory.findMany({
          where: {
            id: { in: menuAddonCategories.map((item) => item.addonCategoryId) },
          },
        });
        const addons = await prisma.addon.findMany({
          where: {
            addonCategoryId: { in: addonCategories.map((item) => item.id) },
          },
        });
        res.status(200).json({
          company,
          locations,
          tables,
          menuCategories,
          menus,
          menuCategoryMenu,
          addonCategories,
          menuAddonCategories,
          addons,
        });
      } else {
        console.log("first user");
        const newCompany = await prisma.company.create({
          data: { name: "default company name" },
        });
        const newUser = await prisma.user.create({
          data: {
            name: "default user name ",
            email: userEmail,
            companyId: newCompany.id,
          },
        });
        const newLocation = await prisma.location.create({
          data: { name: "default location", companyId: newCompany.id },
        });
        const newTable = await prisma.table.create({
          data: { name: "default table", locationId: newLocation.id },
        });
        const newMenuCategory = await prisma.menuCategory.create({
          data: { name: "default menuCategory", companyId: newCompany.id },
        });
        const newMenu = await prisma.menu.create({
          data: { name: "default menu", price: 1000 },
        });
        const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
          data: { menuCategoryId: newMenuCategory.id, menuId: newMenu.id },
        });
        const newAddonCategory = await prisma.addonCategory.create({
          data: { name: "default addonCategory" },
        });
        const newMenuAddonCategory = await prisma.menuAddonCategory.create({
          data: { menuId: newMenu.id, addonCategoryId: newAddonCategory.id },
        });
        const AddonDefaultData = [
          { name: "addon1", addonCategoryId: newAddonCategory.id },
          { name: "addon2", addonCategoryId: newAddonCategory.id },
          { name: "addon3", addonCategoryId: newAddonCategory.id },
        ];
        const newAddon = await prisma.$transaction(
          AddonDefaultData.map((item) => prisma.addon.create({ data: item }))
        );
        res.status(200).json({
          company: newCompany,
          locations: [newLocation],
          table: [newTable],
          menuCategories: [newMenuCategory],
          menus: [newMenu],
          menuCategoryMenu: [newMenuCategoryMenu],
          addonCategories: [newAddonCategory],
          menuAddonCategory: [newMenuAddonCategory],
          addons: [newAddon],
        });
      }
    }
  }

  if (method === "GET") {
    return res.status(200).send("OK GET");
  } else if (method === "POST") {
    res.status(200).send("OK POST");
  } else if (method === "PUT") {
    res.status(200).send("OK PUT");
  } else if (method === "DELETE") {
    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
