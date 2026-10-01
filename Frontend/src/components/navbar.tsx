import { Bell, Menu } from "lucide-react";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  return (
    <header className="mb-4 flex min-h-16 items-center justify-between rounded-xl bg-white px-3 py-3 shadow-sm sm:px-5 lg:mb-6 lg:px-6">

      <div className="flex items-center gap-3">

        {/* Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          title="Open menu"
        >
          <Menu size={23} />
        </button>

        <div>
          <h1 className="text-base font-semibold text-gray-800 sm:text-xl">
            Warehouse Management
          </h1>

          <p className="hidden text-sm text-gray-500 sm:block">
            Manage your warehouse easily
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 sm:gap-5">

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          title="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white sm:h-9 sm:w-9 sm:text-sm">
            N
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Nabila
            </p>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;