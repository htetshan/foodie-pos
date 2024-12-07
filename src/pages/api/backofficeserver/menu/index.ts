// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("OK GET");
  } else if (method === "POST") {
    const { name, price } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) {
      res.status(400).send("Bad request");
    }
    res.status(200).json({ menu: { name, price } });
  } else if (method === "PUT") {
    res.status(200).send("OK PUT");
  } else if (method === "DELETE") {
    res.status(200).send("OK DELETE");
  }
  res.status(405).send("Invalid method");
}
