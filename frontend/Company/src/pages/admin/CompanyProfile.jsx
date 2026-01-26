import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

export default function CompanyProfile() {
  const [form, setForm] = useState({
    company_name: "",
    about: "",
    vision: "",
    mission: "",
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/company-profile");
      if (res.data) {
        setForm(res.data);
        setProfile(res.data);
      }
    } catch {
      console.log("Company profile belum ada");
    }
  };

  useEffect(() => {
    fetchProfile();
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
      await api.post("/company-profile", form);
      await fetchProfile();
      alert("Company profile berhasil disimpan");
    } catch {
      alert("Gagal menyimpan company profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Company Profile</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nama Perusahaan
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tentang</label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Visi</label>
          <textarea
            name="vision"
            value={form.vision}
            onChange={handleChange}
            rows="2"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Misi</label>
          <textarea
            name="mission"
            value={form.mission}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-red-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Data Company Profile</h2>

        {!profile ? (
          <p className="text-gray-500">Belum ada data</p>
        ) : (
          <table className="w-full border">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium w-48">Nama Perusahaan</td>
                <td className="p-3">{profile.company_name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Tentang</td>
                <td className="p-3">{profile.about}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Visi</td>
                <td className="p-3">{profile.vision}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Misi</td>
                <td className="p-3">{profile.mission}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
