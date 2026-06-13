import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Music, Network, Route, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = [
  { icon: Music, label: "Dataset de canciones", color: "bg-amber-100 text-amber-700" },
  { icon: Users, label: "Usuarios similares", color: "bg-blue-100 text-blue-700" },
  { icon: Route, label: "Camino BFS explicable", color: "bg-emerald-100 text-emerald-700" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#ffffff_0%,#f7f9fc_52%,#ecfdf5_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Network className="h-4 w-4" />
              Sistema academico basado en grafos
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Recomendador Musical Inteligente
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Selecciona canciones que te gustan y el backend buscara conexiones en el grafo
              usuario-cancion para sugerir nueva musica con score, usuarios similares y camino BFS.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-12 rounded-full bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onPress={() => navigate("/recommend")}
              >
                <Sparkles className="h-5 w-5" />
                Iniciar recomendacion
              </Button>
              <Button
                className="h-12 rounded-full border border-slate-200 bg-white px-6 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                onPress={() => navigate("/about")}
              >
                <Route className="h-5 w-5" />
                Ver algoritmo
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(140deg,#eff6ff_0%,#ffffff_42%,#f0fdf4_100%)]" />
            <div className="absolute left-8 top-8 rounded-3xl bg-slate-950 p-4 text-white shadow-lg">
              <Music className="h-7 w-7" />
            </div>
            <div className="absolute right-8 top-10 rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 shadow-sm">
              S0001
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Camino BFS</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">U_NEW - S0001 - U0040 - S0125</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                  1.254
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {["U_NEW", "S0001", "U0040", "S0125"].map((node, index) => (
                  <div
                    className={[
                      "rounded-2xl px-3 py-4 text-center text-xs font-bold shadow-sm",
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800",
                    ].join(" ")}
                    key={node}
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                key={item.label}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
