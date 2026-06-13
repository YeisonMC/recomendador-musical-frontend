import { Card } from "@heroui/react";
import { Network, Route, Users } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Filtro colaborativo",
    text: "El backend busca usuarios que comparten canciones con el usuario temporal.",
  },
  {
    icon: Route,
    title: "Recorrido BFS",
    text: "El grafo se explora por niveles: U_NEW, canciones elegidas, usuarios similares y canciones candidatas.",
  },
  {
    icon: Network,
    title: "Score ponderado",
    text: "Los pesos de relaciones LIKES ayudan a ordenar las canciones candidatas.",
  },
];

const AlgorithmExplanation = () => {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase text-blue-700">Como se explica cada resultado</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Grafo musical con recorrido BFS</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Esta recomendacion se genera recorriendo el grafo con BFS y aplicando filtro
          colaborativo basado en usuarios similares. React solo presenta la informacion que
          devuelve FastAPI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <Card className="border border-slate-200 bg-white shadow-sm" key={step.title}>
              <Card.Content className="p-5">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default AlgorithmExplanation;
