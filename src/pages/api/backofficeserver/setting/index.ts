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
    const { id, ...payload } = req.body;
    const existCompany = await prisma.company.findFirst({
      where: { id: id },
    });
    if (!existCompany) return res.status(404).send("Company Not Found");
    const company = await prisma.company.update({
      data: payload,
      where: { id: id },
    });
    res.status(200).json({ company });
    res.status(200).send("OK PUT");
  } else if (method === "DELETE") {
    res.status(200).send("OK DELETE");
  } else {
    res.status(405).send("Invalid Method");
  }
}
