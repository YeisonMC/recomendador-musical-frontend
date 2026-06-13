import { Card } from "@heroui/react";
import { GitBranch, Music, Network, Route, Users } from "lucide-react";
import AlgorithmExplanation from "../components/AlgorithmExplanation";

const details = [
  {
    icon: Music,
    title: "Entrada del usuario",
    text: "El frontend carga canciones reales desde /api/songs para evitar IDs inexistentes.",
  },
  {
    icon: Users,
    title: "Usuario temporal",
    text: "FastAPI crea U_NEW y lo conecta con las canciones seleccionadas por el usuario.",
  },
  {
    icon: GitBranch,
    title: "Grafo no dirigido para BFS",
    text: "Aunque LIKES parte de usuarios hacia canciones, el recorrido permite saltar entre ambos tipos de nodos.",
  },
  {
    icon: Route,
    title: "Recomendacion explicable",
    text: "El campo camino_bfs muestra la ruta usada para justificar cada sugerencia.",
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
          <Network className="h-4 w-4" />
          Fundamento del sistema
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          Grafos, BFS y filtro colaborativo
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
          La aplicacion separa responsabilidades: React se encarga de la experiencia visual,
          Axios consume la API y el backend en Python mantiene la logica del algoritmo. Asi se
          puede demostrar el recorrido sobre el grafo sin duplicar reglas en JavaScript.
        </p>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <Card className="border border-slate-200 bg-white shadow-sm" key={item.title}>
              <Card.Content className="p-5">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Card.Content>
            </Card>
          );
        })}
      </section>

      <AlgorithmExplanation />
    </div>
  );
};

export default AboutPage;
