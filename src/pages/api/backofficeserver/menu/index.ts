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
    res.status(200).send("OK PUT");
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
