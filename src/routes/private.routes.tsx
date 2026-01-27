import type { RouteObject } from "react-router-dom";
import DashboardHome from "../pages/private/DashboardHome";
import PostsPage from "../pages/private/PostsPage";
import UsersPage from "../pages/admin/UsersPage";
import Forbidden from "../pages/private/Forbidden";
import RequireRole from "./RequireRole";
import ClientesPage from "../pages/admin/ClientesPage";
import VeterinariosPage from "../pages/admin/VeterinariosPage";
import MascotasPage from "../pages/private/MascotaPage";

// RECETAS
import RecetasPage from "../pages/private/RecetasPage";
import RecetasAdminPage from "../pages/admin/RecetasAdminPage";

// VACUNAS
import VacunasPage from "../pages/private/VacunasPage";
import VacunasAdminPage from "../pages/admin/VacunasAdminPage";

// VACUNACIONES
import VacunacionesPage from "../pages/private/VacunacionesPage";
import VacunacionesAdminPage from "../pages/admin/VacunacionesAdminPage";

// PAGOS
import PagosAdminPage from "../pages/admin/PagosAdminPage";
import MisPagosPage from "../pages/private/Pagos"; 

export const privateRoutes: RouteObject = {
  path: "/dashboard",
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "mascotas", element: <MascotasPage /> },
    { path: "posts", element: <PostsPage /> },

    // RECETAS
    { path: "recetas", element: <RecetasPage /> },
    { path: "admin-recetas", element: <RequireRole allow={["ADMIN"]}><RecetasAdminPage /></RequireRole> },

    // VACUNAS
    { path: "vacunas", element: <VacunasPage /> },
    { path: "admin-vacunas", element: <RequireRole allow={["ADMIN"]}><VacunasAdminPage /></RequireRole> },

    // VACUNACIONES
    { path: "mis-vacunaciones", element: <VacunacionesPage /> }, 
    { path: "vacunaciones", element: <RequireRole allow={["ADMIN"]}><VacunacionesAdminPage /></RequireRole> },

    // PAGOS
    { path: "mis-pagos", element: <MisPagosPage /> },
    { 
      path: "pagos", 
      element: <RequireRole allow={["ADMIN"]}><PagosAdminPage /></RequireRole> 
    },

    // ADMINISTRACIÓN
    { path: "clientes", element: <RequireRole allow={["ADMIN"]}><ClientesPage /></RequireRole> },
    { path: "veterinarios", element: <RequireRole allow={["ADMIN"]}><VeterinariosPage /></RequireRole> },
    { path: "users", element: <RequireRole allow={["ADMIN"]}><UsersPage /></RequireRole> },
    
    { path: "forbidden", element: <Forbidden /> },
  ],
};