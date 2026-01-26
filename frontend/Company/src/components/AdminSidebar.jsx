import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Mail
} from "lucide-react";

export default function AdminSidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Employees",
      path: "/admin/employees",
      icon: <Users size={18} />,
    },
    {
      name: "Company Profile",
      path: "/admin/company-profile",
      icon: <Building2 size={18} />,
    },
    {
      name: "Contact Info",
      path: "/admin/contact-info",
      icon: <Building2 size={18} />,
    },
    {
      name: "Contact Messages",
      path: "/admin/contact-messages",
      icon: <Mail size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 min-h-screen px-4 py-6">
      <h2 className="text-xl font-bold mb-8 text-center">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
