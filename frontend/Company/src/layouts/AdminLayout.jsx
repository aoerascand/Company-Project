import AdminSidebar from "../components/AdminSidebar";
import { logout } from "../utils/auth";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
