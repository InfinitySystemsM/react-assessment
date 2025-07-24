// models/orm.ts
// Simple ORM-like API for accessing itineraries and legs
import { itineraries, legs } from "./db";

export class ItineraryModel {
  static findAll() {
    return itineraries;
  }

  static findById(id: string) {
    return itineraries.find((it) => it.id === id) || null;
  }

  static findWithLegs(id: string) {
    const itinerary = this.findById(id);
    if (!itinerary) return null;
    return {
      ...itinerary,
      legs: itinerary.legs.map((legId: string) =>
        legs.find((l) => l.id === legId)
      ),
    };
  }
}

export class LegModel {
  static findAll() {
    return legs;
  }

  static findById(id: string) {
    return legs.find((l) => l.id === id) || null;
  }
}
