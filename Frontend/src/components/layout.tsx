import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-64"
        }`}
      >
        <main className="min-h-screen p-3 sm:p-4 lg:p-6">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;