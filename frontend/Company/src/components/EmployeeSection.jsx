import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import api from "../services/api";

export default function EmployeesSection() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/public/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => console.log("Gagal memuat employees"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data karyawan...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Tombol Kembali */}
        <div className="flex justify-start mb-12">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Kembali ke Home
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Berkenalan dengan Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            Tim Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesional berdedikasi yang siap memberikan layanan terbaik
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Employees Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="group relative bg-white rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                {/* Photo with gradient border */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-full h-full p-1 bg-gradient-to-br from-red-500 to-orange-500 rounded-full">
                    <div className="w-full h-full overflow-hidden rounded-full bg-white">
                      <img
                        src={emp.photo_url || "/placeholder-user.png"}
                        alt={emp.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">
                  {emp.name}
                </h3>
                
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-sm font-semibold rounded-full mb-3">
                  {emp.position}
                </div>

                {emp.description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {emp.description}
                  </p>
                )}

                {/* Decorative line */}
                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {employees.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Belum ada data karyawan
            </p>
          </div>
        )}
      </div>
    </section>
  );
}