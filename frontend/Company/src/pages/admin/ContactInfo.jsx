import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

export default function ContactInfo() {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchContact = async () => {
    try {
      const res = await api.get("/contact-info");
      if (res.data) {
        setForm(res.data);
      }
    } catch {
      console.log("Contact info belum ada");
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/contact-info", form);
      alert("Contact info berhasil diperbarui");
    } catch {
      alert("Gagal memperbarui contact info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Contact Information</h1>

      {!loaded ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Telepon</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
                placeholder="628xxxxxxxxxx"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>

          {/* TABLE */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Data Contact Info</h2>

            <table className="w-full border">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium w-48">Alamat</td>
                  <td className="p-3">{form.address}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Email</td>
                  <td className="p-3">{form.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Telepon</td>
                  <td className="p-3">{form.phone}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">WhatsApp</td>
                  <td className="p-3">{form.whatsapp || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
