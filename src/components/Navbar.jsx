import { Button } from "@heroui/react";
import { Info, Music, Network, Sparkles } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", icon: Music },
  { to: "/recommend", label: "Recomendar", icon: Sparkles },
  { to: "/about", label: "Algoritmo", icon: Network },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => navigate("/")}
          type="button"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <Music className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-normal text-slate-950">
              Recomendacion Musical
            </span>
            <span className="block text-sm text-slate-500">Complejidad</span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                className={({ isActive }) =>
                  [
                    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")
                }
                key={item.to}
                to={item.to}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}

          <Button
            className="h-10 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            onPress={() => navigate("/about")}
          >
            <Info className="h-4 w-4" />
            Detalles
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
