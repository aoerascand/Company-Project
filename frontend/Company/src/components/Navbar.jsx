import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = () => {
    setOpen(false);

    if (location.pathname === "/") {
      document
        .getElementById("hero")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-red-600">
          CompanyProfile
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" onClick={handleHomeClick} className="hover:text-red-600">
            Home
          </Link>

          <a href="#about" className="hover:text-red-600">
            Tentang
          </a>

          <a href="#contact" className="hover:text-red-600">
            Kontak
          </a>

          <Link
            to="/employeessection"
            className="text-red-600 font-semibold hover:underline"
          >
            Employees
          </Link>

          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="block text-gray-700 hover:text-red-600"
          >
            Home
          </Link>

          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-red-600"
          >
            Tentang
          </a>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-red-600"
          >
            Kontak
          </a>

          <Link
            to="/employeessection"
            onClick={() => setOpen(false)}
            className="block text-red-600 font-semibold"
          >
            Employees
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-red-600 font-semibold"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
