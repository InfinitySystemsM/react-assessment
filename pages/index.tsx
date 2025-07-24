import { useEffect, useState } from "react";

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

export default function Page() {
  const [itineraries, setItineraries] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/itineraries")
      .then((res) => res.json())
      .then((apiData) => {
        const data = apiData.itineraries.map((it: any) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          agent: it.agent,
          agentIcon: agentIcons[it.agent] || "✈️",
          rating: it.agent_rating,
          highlight: it.highlight,
        }));
        setItineraries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl text-[#2d2046] mb-16">Welcome</h1>
      <div className="flex justify-start gap-5 mb-8">
        <div className="flex items-center w-[300px] h-[48px] bg-[#f7f7f7] rounded-lg px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#A0AEC0"
            className="w-5 h-5 mr-2"
          >
            <circle cx="11" cy="11" r="8" stroke="#A0AEC0" strokeWidth="2" />
            <path
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              d="M21 21l-4.35-4.35"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-500 text-base w-full"
            style={{ fontWeight: 500 }}
          />
        </div>
      </div>
      <p className="mb-8 text-[#2d2046] text-sm">
        Select the itinerary from the list below
      </p>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-2 text-center w-1/4">Id Itinerarie</th>
              <th className="py-2 text-center w-1/4">Price</th>
              <th className="py-2 text-center w-1/4">Agent</th>
              <th className="py-2 text-center w-1/4">Agent rating</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col space-y-3 mt-1">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : (
            itineraries.map((it) => (
              <div
                key={it.id}
                className={`flex items-center bg-white text-center rounded-lg shadow-sm border border-gray-200 ${
                  it.highlight ? "bg-cyan-100" : ""
                }`}
                style={{ minHeight: "48px" }}
                role="row"
              >
                <div
                  className="py-3 px-4 w-1/4 rounded-l-lg flex justify-center items-center text-center"
                  role="cell"
                >
                  <span className="text-center w-full">{it.id}</span>
                </div>
                <div
                  className="py-3 px-4 w-1/4 flex justify-center items-center text-center"
                  role="cell"
                >
                  <span className="text-center w-full">{it.price}</span>
                </div>
                <div
                  className="py-3 px-4 w-1/4 flex justify-center items-center gap-2 text-center"
                  role="cell"
                >
                  <span>{it.agentIcon}</span>
                  <span className="text-center w-full">{it.agent}</span>
                </div>
                <div
                  className="py-3 px-4 w-1/4 rounded-r-lg flex justify-center items-center text-center"
                  role="cell"
                >
                  <span className="text-center w-full">{it.rating}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
