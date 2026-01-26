import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";
import ContactMessage from "../components/ContactMessage";

export default function Home() {
  const [company, setCompany] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/company-profile"),
      api.get("/contact-info"),
    ])
      .then(([companyRes, contactRes]) => {
        setCompany(companyRes.data);
        setContact(contactRes.data);
      })
      .catch(() => console.log("Data belum lengkap"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Hero companyName={company?.company_name} />
      <Features />
      <About
        about={company?.about}
        vision={company?.vision}
        mission={company?.mission}
      />
      <ContactMessage />
      <Contact
        email={contact?.email}
        phone={contact?.phone}
        whatsapp={contact?.whatsapp}
        address={contact?.address}
      />
      <Footer/>
    </>
  );
}
