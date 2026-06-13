import { Button, Select, ListBox } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import AlgorithmExplanation from "../components/AlgorithmExplanation";
import ErrorMessage from "../components/ErrorMessage";
import LoadingState from "../components/LoadingState";
import RecommendationsList from "../components/RecommendationsList";
import SelectedSongs from "../components/SelectedSongs";
import SongSearch from "../components/SongSearch";
import { getApiErrorDetail, getHealth, getRecommendations, getSongs } from "../api/musicApi";

const topOptions = [
  { id: "5", label: "5 recomendaciones" },
  { id: "10", label: "10 recomendaciones" },
  { id: "15", label: "15 recomendaciones" },
  { id: "20", label: "20 recomendaciones" },
];

const RecommendPage = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [topN, setTopN] = useState(5);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  const [healthStatus, setHealthStatus] = useState("Verificando backend...");

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setIsLoadingSongs(true);

      try {
        const [health, songData] = await Promise.allSettled([getHealth(), getSongs()]);

        if (!isMounted) {
          return;
        }

        if (health.status === "fulfilled") {
          setHealthStatus(health.value.message ?? "Backend conectado correctamente.");
        } else {
          setHealthStatus("Backend no disponible en este momento.");
        }

        if (songData.status === "fulfilled") {
          setSongs(Array.isArray(songData.value.songs) ? songData.value.songs : []);
          setError("");
          setErrorDetail("");
        } else {
          setError("No se pudieron cargar las canciones disponibles.");
          setErrorDetail("Verifica que FastAPI este activo en http://127.0.0.1:8000.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingSongs(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedSongIds = useMemo(
    () => selectedSongs.map((song) => song.song_id),
    [selectedSongs],
  );

  const handleAddSong = (song) => {
    setError("");
    setErrorDetail("");
    setSelectedSongs((currentSongs) => {
      if (currentSongs.some((currentSong) => currentSong.song_id === song.song_id)) {
        return currentSongs;
      }

      return [...currentSongs, song];
    });
  };

  const handleRemoveSong = (songId) => {
    setSelectedSongs((currentSongs) => currentSongs.filter((song) => song.song_id !== songId));
  };

  const handleGenerateRecommendations = async () => {
    if (selectedSongIds.length === 0) {
      setError("Selecciona al menos una cancion para generar recomendaciones.");
      setErrorDetail("");
      setRecommendations(null);
      return;
    }

    setIsGenerating(true);
    setError("");
    setErrorDetail("");

    try {
      const data = await getRecommendations(selectedSongIds, topN);
      setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
    } catch (requestError) {
      setRecommendations(null);
      setError("No se pudieron generar recomendaciones. Verifica las canciones seleccionadas o intenta nuevamente.");
      setErrorDetail(getApiErrorDetail(requestError));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">Recomendacion musical</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Recomendador Musical Inteligente
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Selecciona algunas canciones que te gusten y el sistema buscara usuarios con
              gustos similares para recomendarte nueva musica.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            {healthStatus}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="space-y-6 p-5 sm:p-6">
            <SongSearch
              isLoading={isLoadingSongs}
              onAddSong={handleAddSong}
              selectedSongs={selectedSongs}
              songs={songs}
            />
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="space-y-6 p-5 sm:p-6">
              <SelectedSongs onRemoveSong={handleRemoveSong} songs={selectedSongs} />

              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Cantidad de recomendaciones
                  </label>
                  <Select
                    aria-label="Cantidad de recomendaciones"
                    className="max-w-xs"
                    onSelectionChange={(key) => setTopN(Number(key))}
                    selectedKey={String(topN)}
                  >
                    <Select.Trigger className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {topOptions.map((option) => (
                          <ListBox.Item id={option.id} key={option.id}>
                            {option.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <Button
                  className="h-12 rounded-full bg-emerald-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  isDisabled={isGenerating || isLoadingSongs}
                  onPress={handleGenerateRecommendations}
                >
                  Generar recomendaciones
                </Button>
              </div>

              {error ? <ErrorMessage detail={errorDetail} title={error} /> : null}
              {isGenerating ? <LoadingState message="Consultando FastAPI y preparando recomendaciones..." /> : null}
            </div>
          </section>

          <AlgorithmExplanation />
        </div>
      </div>

      <section className="mt-8">
        <RecommendationsList recommendations={recommendations} />
      </section>
    </div>
  );
};

export default RecommendPage;
