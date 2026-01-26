import { useState } from "react";
import api from "../services/api";

export default function ContactMessage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/contact-messages", form);
      setSuccess("Pesan berhasil dikirim");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-6">
        Hubungi Kami
      </h2>

      {success && (
        <p className="text-green-600 text-center mb-4">{success}</p>
      )}

      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Pesan"
          rows="4"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>
    </section>
  );
}
