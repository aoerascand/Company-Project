import { Sparkles, TrendingUp } from "lucide-react";

export default function About({ about, vision, mission }) {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Tentang Kami
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* ABOUT */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 backdrop-blur-sm border border-gray-100">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {about || "Informasi perusahaan belum tersedia."}
          </p>
        </div>

        {/* VISION & MISSION */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative bg-gradient-to-br from-red-600 to-orange-600 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                Visi
              </h3>
              <p className="text-red-50 leading-relaxed text-lg">
                {vision || "-"}
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-orange-600 to-rose-600 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                Misi
              </h3>
              <p className="text-orange-50 leading-relaxed text-lg">
                {mission || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}