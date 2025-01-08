// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("OK GET");
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
