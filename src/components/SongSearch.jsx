import { Button, Card, Chip, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { Music, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_COUNT = 10;

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SongSearch = ({ isLoading, onAddSong, selectedSongs, songs }) => {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const selectedIds = useMemo(
    () => new Set(selectedSongs.map((song) => song.song_id)),
    [selectedSongs],
  );

  const filteredSongs = useMemo(() => {
    const normalizedQuery = normalize(query);

    return songs.filter((song) => {
      if (selectedIds.has(song.song_id)) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return [song.name, song.artist, song.genre, song.song_id].some((value) =>
        normalize(value).includes(normalizedQuery),
      );
    });
  }, [query, selectedIds, songs]);

  const visibleSongs = useMemo(
    () => filteredSongs.slice(0, visibleCount),
    [filteredSongs, visibleCount],
  );

  const hasMoreSongs = visibleSongs.length < filteredSongs.length;

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <section className="space-y-4">
      <div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-700"
          htmlFor="song-search"
        >
          Buscar canciones
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            aria-label="Buscar canciones por nombre, artista, genero o ID"
            className="h-12 rounded-2xl border border-slate-200 bg-white pl-10 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            id="song-search"
            onChange={handleQueryChange}
            placeholder="Nombre, artista, genero o ID"
            value={query}
          />
        </div>
      </div>

      <div className="space-y-3">
        {!isLoading ? (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span>
              Mostrando {visibleSongs.length} de {filteredSongs.length}{" "}
              coincidencias disponibles.
            </span>
            <span>{songs.length} canciones cargadas desde el API.</span>
          </div>
        ) : null}

        {isLoading ? (
          <Card className="border border-slate-200 bg-white shadow-sm">
            <Card.Content className="p-4 text-sm text-slate-500">
              Cargando canciones del dataset...
            </Card.Content>
          </Card>
        ) : null}

        {!isLoading && filteredSongs.length === 0 ? (
          <Card className="border border-amber-200 bg-amber-50 shadow-sm">
            <Card.Content className="p-4 text-sm text-amber-800">
              No hay coincidencias disponibles para esa busqueda.
            </Card.Content>
          </Card>
        ) : null}

        {!isLoading
          ? visibleSongs.map((song, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 8 }}
                key={song.song_id}
                transition={{ delay: index * 0.03, duration: 0.18 }}
              >
                <Card className="border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <Card.Content className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Music className="h-4 w-4 text-amber-500" />
                        <h3 className="truncate text-base font-semibold text-slate-950">
                          {song.name}
                        </h3>
                        <Chip className="bg-slate-100 text-xs text-slate-600">
                          {song.song_id}
                        </Chip>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {song.artist} - {song.genre} - {song.release_year}
                      </p>
                    </div>

                    <Button
                      className="h-10 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                      onPress={() => onAddSong(song)}
                    >
                      <Plus className="h-4 w-4" />
                      Agregar
                    </Button>
                  </Card.Content>
                </Card>
              </motion.div>
            ))
          : null}

        {!isLoading && hasMoreSongs ? (
          <Button
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            onPress={() =>
              setVisibleCount((currentCount) => currentCount + LOAD_MORE_COUNT)
            }
          >
            <Plus className="h-4 w-4" />
            Mostrar{" "}
            {Math.min(
              LOAD_MORE_COUNT,
              filteredSongs.length - visibleSongs.length,
            )}{" "}
            mas
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default SongSearch;
