import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("Gagal mengambil data employee", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Gagal menghapus employee", error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Employees</h1>

          <Link
            to="/admin/employees/create"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            + Tambah Employee
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="text-left px-4 py-3">Foto</th>
                <th className="text-left px-4 py-3">Nama</th>
                <th className="text-left px-4 py-3">Jabatan</th>
                <th className="text-left px-4 py-3">Deskripsi</th>
                <th className="text-left px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Data kosong
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t hover:bg-gray-50 transition align-top"
                  >
                    <td className="px-4 py-3">
                      {emp.photo ? (
                        <img
                          src={emp.photo}
                          alt={emp.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {emp.name}
                    </td>

                    <td className="px-4 py-3">
                      {emp.position}
                    </td>

                    <td className="px-4 py-3 text-gray-600 max-w-xs">
                      {emp.description || "-"}
                    </td>

                    <td className="px-4 py-3 space-x-3 whitespace-nowrap">
                      <Link
                        to={`/admin/employees/edit/${emp.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
