export default function Contact({ address, email, phone, whatsapp }) {
  const contactItems = [
    { label: "Alamat", value: address, icon: "📍" },
    { label: "Email", value: email, icon: "✉️", link: email ? `mailto:${email}` : null },
    { label: "Telepon", value: phone, icon: "📞", link: phone ? `tel:${phone}` : null },
    { 
      label: "WhatsApp", 
      value: whatsapp, 
      icon: "💬", 
      link: whatsapp ? `https://wa.me/${whatsapp}` : null,
      special: true 
    }
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-32 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Kontak
          </h2>
          <p className="text-xl text-gray-400">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>  

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contactItems.map((item, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-gradient-to-br hover:from-red-900/20 hover:to-orange-900/20 hover:border-red-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1 font-semibold">{item.label}</div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.special ? "_blank" : undefined}
                      rel={item.special ? "noreferrer" : undefined}
                      className={`text-lg font-medium ${
                        item.special 
                          ? "text-green-400 hover:text-green-300" 
                          : "text-white hover:text-red-400"
                      } transition-colors`}
                    >
                      {item.value || "-"}
                    </a>
                  ) : (
                    <div className="text-lg font-medium text-white">
                      {item.value || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}