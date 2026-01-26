import axios from "axios";

export const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    await axios.post(
      "http://127.0.0.1:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Logout API error:", error);
  }

  // hapus token di frontend
  localStorage.removeItem("token");

  // arahkan ke login
  window.location.href = "/login";
};
