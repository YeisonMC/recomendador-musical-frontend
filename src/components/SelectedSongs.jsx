import { Chip } from "@heroui/react";
import { Music, X } from "lucide-react";

const SelectedSongs = ({ onRemoveSong, songs }) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-950">Canciones seleccionadas</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {songs.length} elegidas
        </span>
      </div>

      {songs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-500">
          Selecciona al menos una cancion para generar recomendaciones.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {songs.map((song) => (
            <Chip
              className="gap-2 border border-blue-100 bg-blue-50 px-3 py-2 text-blue-800"
              key={song.song_id}
            >
              <Music className="h-3.5 w-3.5" />
              <span className="max-w-52 truncate text-sm font-medium">{song.name}</span>
              <button
                aria-label={`Quitar ${song.name}`}
                className="ml-1 rounded-full p-0.5 text-blue-700 transition hover:bg-blue-100"
                onClick={() => onRemoveSong(song.song_id)}
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Chip>
          ))}
        </div>
      )}
    </section>
  );
};

export default SelectedSongs;
