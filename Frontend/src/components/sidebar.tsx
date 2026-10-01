import {
  LayoutDashboard,
  Package,
  Warehouse,
  Users,
  Truck,
  UserCog,
  Boxes,
  ShoppingCart,
  Receipt,
  BarChart3,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const basicInformation: MenuItem[] = [
  {
    name: "Materials",
    path: "/materials",
    icon: <Package size={19} />,
  },
  {
    name: "Warehouses",
    path: "/warehouses",
    icon: <Warehouse size={19} />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <Users size={19} />,
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: <Truck size={19} />,
  },
  {
    name: "Users & Permissions",
    path: "/users",
    icon: <UserCog size={19} />,
  },
];

const operations: MenuItem[] = [
  {
    name: "Purchase Invoices",
    path: "/purchase-invoices",
    icon: <ShoppingCart size={19} />,
  },
  {
    name: "Sales Invoices",
    path: "/sales-invoices",
    icon: <Receipt size={19} />,
  },
  {
    name: "Stock",
    path: "/stock",
    icon: <Boxes size={19} />,
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64
          flex-col bg-gray-900 px-4 py-6 text-white
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900">
              <Boxes size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Warehouse
              </h2>

              <p className="text-xs text-gray-400">
                Management System
              </p>
            </div>
          </div>

          {/* Close button - Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Main
          </p>

          <NavItem
            name="Dashboard"
            path="/"
            icon={<LayoutDashboard size={19} />}
            setSidebarOpen={setSidebarOpen}
          />

          <p className="mb-3 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Basic Information
          </p>

          <div className="space-y-1">
            {basicInformation.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                setSidebarOpen={setSidebarOpen}
              />
            ))}
          </div>

          <p className="mb-3 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Operations
          </p>

          <div className="space-y-1">
            {operations.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                setSidebarOpen={setSidebarOpen}
              />
            ))}
          </div>

          <p className="mb-3 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Reports
          </p>

          <NavItem
            name="Reports"
            path="/reports"
            icon={<BarChart3 size={19} />}
            setSidebarOpen={setSidebarOpen}
          />

        </nav>
      </aside>
    </>
  );
}

function NavItem({
  name,
  path,
  icon,
  setSidebarOpen,
}: MenuItem & {
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <NavLink
      to={path}
      end={path === "/"}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`transition-transform duration-200 ${
              isActive ? "" : "group-hover:scale-110"
            }`}
          >
            {icon}
          </span>

          <span>{name}</span>
        </>
      )}
    </NavLink>
  );
}

export default Sidebar;