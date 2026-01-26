import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);


  useEffect(() => {
    Promise.all([
      api.get("/user"),
      api.get("/dashboard/stats"),
    ])
      .then(([userRes, statsRes]) => {
        setUser(userRes.data);
        setTotalEmployees(statsRes.data.total_employees);
      })
      .catch(() => console.log("Unauthorized"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview & ringkasan data aplikasi
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ) : user ? (
            <p className="text-lg text-gray-700">
              Selamat datang kembali,{" "}
              <span className="font-semibold text-blue-600">
                {user.name}
              </span>
            </p>
          ) : (
            <p className="text-red-500">Gagal memuat data user</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-sm text-gray-500 mb-1">Total Employees</p>
            <h2 className="text-3xl font-bold text-gray-800"> {loading ? "…" : totalEmployees}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-sm text-gray-500 mb-1">Company Profile</p>
            <h2 className="text-3xl font-bold text-green-600">Active</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-sm text-gray-500 mb-1">Last Login</p>
            <h2 className="text-3xl font-bold text-gray-800">—</h2>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
