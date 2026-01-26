import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function EmployeeForm() {
  const { id } = useParams(); // edit jika ada
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    position: "",
    description: "",
    photo: null, // File | string (url lama)
  });

  const [loading, setLoading] = useState(false);

  // ===== FETCH DATA SAAT EDIT =====
  useEffect(() => {
    if (id) {
      api.get(`/employees/${id}`).then((res) => {
        setForm({
          name: res.data.name ?? "",
          position: res.data.position ?? "",
          description: res.data.description ?? "",
          photo: res.data.photo_url ?? null, // URL dari backend
        });
      });
    }
  }, [id]);

  // ===== HANDLE INPUT TEXT =====
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===== HANDLE FILE =====
  const handleFileChange = (e) => {
    setForm({
      ...form,
      photo: e.target.files[0],
    });
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("position", form.position);
      data.append("description", form.description);

      if (form.photo instanceof File) {
        data.append("photo", form.photo);
      }

      if (id) {
        await api.post(`/employees/${id}?_method=PUT`, data);
      } else {
        await api.post("/employees", data);
      }

      navigate("/admin/employees");
    } catch (error) {
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {id ? "Edit Employee" : "Tambah Employee"}
        </h1>

        <Link
          to="/admin/employees"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Kembali
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
        encType="multipart/form-data"
      >
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Jabatan */}
        <div>
          <label className="block text-sm font-medium mb-1">Jabatan</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Foto */}
        <div>
          <label className="block text-sm font-medium mb-1">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />

          {form.photo && (
            <img
              src={
                typeof form.photo === "string"
                  ? form.photo
                  : URL.createObjectURL(form.photo)
              }
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
