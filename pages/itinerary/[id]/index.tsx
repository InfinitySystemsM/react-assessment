import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const agentIcons: Record<string, string> = {
  "Wizzair.com": "✈️",
  "Wizz Air": "✈️",
  CheapFligths: "💸",
  Cheapfly: "💸",
  Lufthansa: "🛫",
  "Kiwi.com": "🥝",
  "Kiwi.co": "🥝",
  "Trip.com": "🌊",
  "Trip.co": "🌊",
  "British Airways": "🇬🇧",
};

export default function ItineraryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/itinerary?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data.itinerary);
        setLoading(false);
      });
  }, [id]);

  if (loading || !itinerary) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-full text-gray-400 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#2d2046]">{itinerary.id}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/user.png"
              alt="Pepe Ladino"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-[#2d2046]">Pepe Ladino</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f2f2f2] hover:bg-cyan-100 transition">
            <img src="/help.svg" alt="Help" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center">
        {itinerary.legs.map((leg, idx) => (
          <div key={leg.id} className="flex items-center gap-8 w-full max-w-xl">
            <span className="flex items-center justify-center">
              <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
                {idx === 1 ? (
                  <span className="w-3 h-3 rounded-full bg-gray-400 block" />
                ) : null}
              </span>
            </span>
            <div className="flex-1">
              <div className="bg-[#f2f2f2] rounded-lg mb-2 flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <span>{agentIcons[leg.airline_name] || "✈️"}</span>
                  <span className="font-medium text-gray-700">
                    {leg.airline_name}
                  </span>
                </div>
                <span className="text-cyan-600 font-medium">Leg_{leg.id}</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    AIRLINE ID:{" "}
                    <span className="font-bold text-gray-700">
                      {leg.airline_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-700">
                      {leg.departure_airport}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-bold text-gray-700">
                      {leg.arrival_airport}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {leg.departure_time} → {leg.arrival_time}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-500">
                    STOPS:{" "}
                    <span className="font-bold text-gray-700">{leg.stops}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    DURATION MINS:{" "}
                    <span className="font-bold text-gray-700">
                      {leg.duration_mins}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
