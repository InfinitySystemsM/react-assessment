import { ItineraryModel } from "../../models/orm";

export default function handler(req, res) {
  const { id } = req.query;
  const itinerary = ItineraryModel.findWithLegs(id);
  if (!itinerary) {
    res.status(404).json({ error: "Itinerary not found" });
    return;
  }
  res.status(200).json({ itinerary });
}
