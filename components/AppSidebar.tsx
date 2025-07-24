import React from "react";

export default function AppSidebar() {
  return (
    <aside className="flex flex-col items-center pt-20 px-8 h-full border-r-2 border-[#426294]">
      <button className="w-full flex items-center gap-2 px-6 py-2 rounded-lg bg-cyan-100 text-cyan-600 font-medium shadow-sm hover:bg-cyan-200 transition mb-2">
        <span className="text-lg">
          <img src="/itineraries.svg" alt="Icon" className="w-5 h-5" />
        </span>
        Itineraries
      </button>
    </aside>
  );
}
