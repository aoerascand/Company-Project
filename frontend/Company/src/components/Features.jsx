import { Briefcase, Users, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      title: "Company Profile",
      desc: "Kelola informasi perusahaan secara terpusat dengan dashboard intuitif.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Data Karyawan",
      desc: "Manajemen data karyawan dengan CRUD lengkap dan analytics real-time.",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: ShieldCheck,
      title: "Sistem Aman",
      desc: "Autentikasi token dan enkripsi tingkat enterprise untuk keamanan maksimal.",
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-rose-500"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Fitur Utama Sistem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Teknologi terdepan untuk mengoptimalkan operasional bisnis Anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>

                <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-20 transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}