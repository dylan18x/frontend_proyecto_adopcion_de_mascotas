import type { RouteObject } from "react-router-dom";
import DashboardHome from "../pages/private/DashboardHome";
import CategoriesPage from "../pages/private/CategoriesPage";
import PostsPage from "../pages/private/PostsPage";
import UsersPage from "../pages/private/UsersPage";
import Forbidden from "../pages/private/Forbidden";
import RequireRole from "./RequireRole";
import ClientesPage from "../pages/private/ClientesPage";
import VeterinariosPage from "../pages/private/VeterinariosPage";
import MascotasPage from "../pages/private/MascotaPage";

// 1. Importa tus nuevas páginas
import RecetasPage from "../pages/private/RecetasPage";
import VacunasPage from "../pages/private/VacunasPage";
import VacunacionesPage from "../pages/private/VacunacionesPage";

export const privateRoutes: RouteObject = {
  path: "/dashboard",
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "clientes", element: <ClientesPage /> },
    { path: "veterinarios", element: <VeterinariosPage /> },
    { path: "mascotas", element: <MascotasPage /> },
    { path: "recetas", element: <RecetasPage /> },
    { path: "vacunas", element: <VacunasPage /> },
    { path: "vacunaciones", element: <VacunacionesPage /> },
    { path: "categories", element: <CategoriesPage /> },
    { path: "posts", element: <PostsPage /> },
    { path: "forbidden", element: <Forbidden /> },
    {
      path: "users",
      element: (
        <RequireRole allow={["ADMIN"]}>
          <UsersPage />
        </RequireRole>
      ),
    },
  ],
};