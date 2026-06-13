import { Card } from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import RecommendationCard from "./RecommendationCard";

const RecommendationsList = ({ recommendations }) => {
  if (recommendations === null) {
    return null;
  }

  if (recommendations.length === 0) {
    return (
      <Card className="border border-amber-200 bg-amber-50 shadow-sm">
        <Card.Content className="p-5">
          <p className="text-sm font-semibold text-amber-900">
            No se encontraron recomendaciones para esta seleccion. Intenta elegir mas canciones.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-emerald-600" />
        <h2 className="text-xl font-bold text-slate-950">Recomendaciones generadas</h2>
      </div>
      <AnimatePresence>
        <div className="grid gap-4">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              index={index}
              key={recommendation.song_id ?? `${recommendation.name}-${index}`}
              recommendation={recommendation}
            />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default RecommendationsList;
