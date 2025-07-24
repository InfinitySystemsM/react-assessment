import type { NextApiRequest, NextApiResponse } from "next";
import { ItineraryModel } from "../../models/orm";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const itineraries = ItineraryModel.findAll().map((it) => ({
    id: it.id,
    name: it.id,
    price: it.price,
    agent: it.agent,
    agent_rating: it.agent_rating,
    highlight: it.agent_rating >= 9.5,
  }));
  res.status(200).json({ itineraries });
}
