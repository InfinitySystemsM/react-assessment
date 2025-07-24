import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const [itineraries, setItineraries] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Array<any>>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState<"popular" | "price" | "rate">(
    "popular"
  );
  const router = useRouter();

  useEffect(() => {
    fetch("/api/itineraries")
      .then((res) => res.json())
      .then((apiData) => {
        console.log(apiData);
        const data = apiData.itineraries.map((it: any) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          agent: it.agent,
          icon: it.icon, // Assuming the API provides the icon URL in icon field
          rating: it.agent_rating,
          highlight: it.highlight,
        }));
        setItineraries(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(itineraries);
    } else {
      setFiltered(
        itineraries.filter(
          (it) =>
            it.id.toLowerCase().includes(search.toLowerCase()) ||
            it.agent.toLowerCase().includes(search.toLowerCase()) ||
            it.price.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, itineraries]);

  useEffect(() => {
    let sorted = [...filtered];
    if (sortType === "price") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortType === "rate") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted = sorted.sort(() => Math.random() - 0.5);
    }
    setFiltered(sorted);
  }, [sortType]);

  const handleSort = (type: "popular" | "price" | "rate") => {
    setSortType(type);
    setShowFilter(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#2d2046]">Welcome</h1>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f2f2f2] font-medium shadow-sm hover:bg-cyan-200 transition"
            onClick={() => setShowFilter((prev) => !prev)}
            style={{ height: "48px" }}
          >
            <img src="/filter.svg" alt="Filter" className="w-5 h-5" />
          </button>
          {showFilter && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <ul className="py-2">
                <li>
                  <button
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      sortType === "popular" ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => handleSort("popular")}
                  >
                    <img src="/smile.svg" alt="Popular" className="w-5 h-5" />
                    Most Popular
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      sortType === "price" ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => handleSort("price")}
                  >
                    <img src="/currency.svg" alt="Price" className="w-5 h-5" />
                    Price, Low to High
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      sortType === "rate" ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => handleSort("rate")}
                  >
                    <img src="/star.svg" alt="Rate" className="w-5 h-5" />
                    Rate, High to Low
                  </button>
                </li>
              </ul>
            </div>
          )}
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
            filtered.map((it) => (
              <div
                key={it.id}
                className={`flex items-center bg-white text-center rounded-lg shadow-sm border border-gray-200 ${
                  it.highlight ? "bg-cyan-100" : ""
                } hover:bg-green-100 transition-colors duration-200 cursor-pointer`}
                style={{ minHeight: "48px" }}
                role="row"
                onClick={() => router.push(`/itinerary/${it.id}`)}
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
                  <span>
                    <img src={it.icon} alt={it.agent} className="w-5 h-5" />
                  </span>
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
