import { Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, Music, Network, Route, Sparkles, Users } from "lucide-react";

const formatScore = (score) => {
  const numericScore = Number(score);
  return Number.isFinite(numericScore) ? numericScore.toFixed(3) : "N/D";
};

const getSimilarUsers = (recommendation) => {
  const users = recommendation.usuarios_similares;

  if (Array.isArray(users)) {
    return users;
  }

  if (typeof users === "string" && users.trim()) {
    return users.split(",").map((user) => user.trim());
  }

  return [];
};

const getPathNodes = (path) => {
  if (!path) {
    return [];
  }

  return String(path)
    .split(/\s*(?:→|->|â†’)\s*/)
    .map((node) => node.trim())
    .filter(Boolean);
};

const RecommendationCard = ({ recommendation, index }) => {
  const similarUsers = getSimilarUsers(recommendation);
  const pathNodes = getPathNodes(recommendation.camino_bfs);

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 14 }}
      transition={{ delay: index * 0.06, duration: 0.24 }}
    >
      <Card className="border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <Card.Header className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Recomendacion #{index + 1}
            </div>
            <Card.Title className="mt-2 text-xl font-bold text-slate-950">
              {recommendation.name}
            </Card.Title>
            <p className="mt-1 text-sm text-slate-600">{recommendation.artist}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase text-emerald-700">Score</p>
            <p className="text-lg font-bold text-emerald-900">
              {formatScore(recommendation.score)}
            </p>
          </div>
        </Card.Header>

        <Card.Content className="space-y-5 p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-amber-50 px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-700">
                <Music className="h-3.5 w-3.5" />
                Genero
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-950">{recommendation.genre}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-700">
                <CalendarDays className="h-3.5 w-3.5" />
                Año
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-950">
                {recommendation.release_year}
              </p>
            </div>
            <div className="rounded-2xl bg-violet-50 px-4 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-violet-700">
                <Network className="h-3.5 w-3.5" />
                ID
              </p>
              <p className="mt-1 text-sm font-semibold text-violet-950">
                {recommendation.song_id}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Users className="h-4 w-4 text-blue-600" />
              Usuarios similares utilizados
            </p>
            <div className="flex flex-wrap gap-2">
              {similarUsers.length > 0 ? (
                similarUsers.map((user) => (
                  <Chip className="bg-blue-50 text-blue-800" key={user}>
                    {user}
                  </Chip>
                ))
              ) : (
                <span className="text-sm text-slate-500">Sin usuarios similares informados.</span>
              )}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Route className="h-4 w-4 text-emerald-600" />
              Camino BFS
            </p>
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {pathNodes.length > 0 ? (
                pathNodes.map((node, nodeIndex) => (
                  <span className="flex items-center gap-2" key={`${node}-${nodeIndex}`}>
                    <Chip className="bg-white text-slate-700 shadow-sm">{node}</Chip>
                    {nodeIndex < pathNodes.length - 1 ? (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    ) : null}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  El backend no envio un camino BFS para esta recomendacion.
                </span>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.article>
  );
};

export default RecommendationCard;
