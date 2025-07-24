import React from "react";
import AppSidebar from "../components/AppSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5 py-10 gap-5 h-screen">
      <AppSidebar />
      <div className="col-span-4 px-20 py-5">{children}</div>
    </div>
  );
}
