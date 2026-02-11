import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    api.get("/contact-messages")
        .then(res => setMessages(res.data))
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus pesan ini?")) return;
    try{
      await api.delete(`/contact-messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }catch(error){
      console.error("Gagal menghapus pesan", error);
      alert("Gagal menghapus pesan");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Contact Messages
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">Belum ada pesan</p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Pesan</th>
                  <th className="px-4 py-3 text-left">Tanggal</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                  </tr>
              </thead>

              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-t">
                    <td className="px-4 py-3">{msg.name}</td>
                    <td className="px-4 py-3">{msg.email}</td>
                    <td className="px-4 py-3">{msg.message}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <button onClick={() => handleDelete(msg.id)}
                      className="text-red-600 hover:underline">Hapus</button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
