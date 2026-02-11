import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Briefcase } from "lucide-react";
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Memuat data karyawan...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-red-200 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Additional decorative circles for visual interest */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-rose-200 rounded-full filter blur-2xl opacity-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 sm:w-56 sm:h-56 bg-red-300 rounded-full filter blur-2xl opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Tombol Kembali */}
        <div className="flex justify-start mb-8 sm:mb-10 md:mb-12">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden xs:inline">Kembali ke Home</span>
            <span className="xs:hidden">Kembali</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            Berkenalan dengan Kami
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent leading-tight px-4">
            Tim Kami
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Profesional berdedikasi yang siap memberikan layanan terbaik
          </p>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        {/* Employees Grid */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                {/* Photo with gradient border */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="relative w-full h-full p-1 bg-gradient-to-br from-red-500 to-orange-500 rounded-full">
                    <div className="w-full h-full overflow-hidden rounded-full bg-white">
                      <img
                        src={emp.photo_url || "/placeholder-user.png"}
                        alt={emp.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/placeholder-user.png";
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 px-2">
                  {emp.name}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs sm:text-sm font-semibold rounded-full mb-3 shadow-sm">
                  <Briefcase className="w-3 h-3" />
                  <span className="line-clamp-1">{emp.position}</span>
                </div>

                {emp.description && (
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 px-2">
                    {emp.description}
                  </p>
                )}

                {/* Decorative line */}
                <div className="mt-3 sm:mt-4 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {employees.length === 0 && (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              Belum ada data karyawan
            </p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Data karyawan akan ditampilkan di sini
            </p>
          </div>
        )}
      </div>
    </section>
  );
}