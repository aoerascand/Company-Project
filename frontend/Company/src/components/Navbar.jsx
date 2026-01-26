import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-red-600">
          CompanyProfile
        </h1>

        {/* Menu */}
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>

          {/* Anchor ke section */}
          <a href="#about" className="hover:text-red-600">
            Tentang
          </a>

          <a href="#contact" className="hover:text-red-600">
            Kontak
          </a>

          {/* Route ke halaman lain */}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Admin
          </Link>
          <Link
            to="/employeessection"
            className="text-red-600 font-semibold hover:underline"
          >
            Employees
          </Link>
        </div>
      </div>
    </nav>
  );
}
