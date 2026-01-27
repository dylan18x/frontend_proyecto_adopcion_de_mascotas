import type { RouteObject } from "react-router-dom";
import DashboardHome from "../pages/private/DashboardHome";
import CategoriesPage from "../pages/private/CategoriesPage";
import PostsPage from "../pages/private/PostsPage";
import UsersPage from "../pages/admin/UsersPage";
import Forbidden from "../pages/private/Forbidden";
import RequireRole from "./RequireRole";
import ClientesPage from "../pages/admin/ClientesPage";
import VeterinariosPage from "../pages/admin/VeterinariosPage";
import MascotasPage from "../pages/private/MascotaPage";
import RecetasPage from "../pages/private/RecetasPage";
import VacunasPage from "../pages/private/VacunasPage";
import VacunacionesPage from "../pages/admin/VacunacionesPage";

export const privateRoutes: RouteObject = {
  path: "/dashboard",
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "mascotas", element: <MascotasPage /> },
    { path: "recetas", element: <RecetasPage /> },
    { path: "posts", element: <PostsPage /> },
    { path: "vacunas", element: <VacunasPage /> },

    { path: "vacunaciones", element: <RequireRole allow={["ADMIN"]}><VacunacionesPage /></RequireRole> },
    { path: "clientes", element: <RequireRole allow={["ADMIN"]}><ClientesPage /></RequireRole> },
    { path: "veterinarios", element: <RequireRole allow={["ADMIN"]}><VeterinariosPage /></RequireRole> },
    { path: "users", element: <RequireRole allow={["ADMIN"]}><UsersPage /></RequireRole> },
    { path: "forbidden", element: <Forbidden /> },
  ],
};
