import type { RouteObject } from "react-router-dom";
import DashboardHome from "../pages/private/DashboardHome";
import PostsPage from "../pages/private/PostsPage";
import UsersPage from "../pages/admin/UsersPage";
import Forbidden from "../pages/private/Forbidden";
import RequireRole from "./RequireRole";
import ClientesPage from "../pages/admin/ClientesPage";
import VeterinariosPage from "../pages/private/VeterinariosPage";
import MascotasPage from "../pages/private/MascotaPage";
import CitasPage from "../pages/private/CitasPage";
import CitasAdminPage from "../pages/admin/CitasAdminPage";
import ConsultasPage from "../pages/private/ConsultasPage";
import ConsultasAdminPage from "../pages/admin/ConsultasAdminPage";
import HistorialMedicoAdminPage from "../pages/admin/HistorialMedicoAdminPage";
import RecetasPage from "../pages/private/RecetasPage";
import RecetasAdminPage from "../pages/admin/RecetasAdminPage";
import VacunasPage from "../pages/private/VacunasPage";
import VacunasAdminPage from "../pages/admin/VacunasAdminPage";
import VacunacionesPage from "../pages/private/VacunacionesPage";
import VacunacionesAdminPage from "../pages/admin/VacunacionesAdminPage";
import MisPagosPage from "../pages/private/Pagos";
import MedicamentosPage from "../pages/private/MedicamentosPage";

export const privateRoutes: RouteObject = {
  path: "/dashboard",
  children: [
    { path: "", element: <DashboardHome /> },
    { path: "mascotas", element: <MascotasPage /> },
    { path: "posts", element: <PostsPage /> },
    { path: "citas", element: <CitasPage /> },
    { path: "admin-citas", element: (<RequireRole allow={["ADMIN"]}><CitasAdminPage /></RequireRole>), },
    { path: "consultas", element: <ConsultasPage /> },
    { path: "admin-consultas", element: (<RequireRole allow={["ADMIN"]}><ConsultasAdminPage /></RequireRole>), },
    { path: "admin-historial", element: (<RequireRole allow={["ADMIN"]}><HistorialMedicoAdminPage /></RequireRole>), },
    { path: "recetas", element: <RecetasPage /> },
    { path: "admin-recetas", element: (<RequireRole allow={["ADMIN"]}><RecetasAdminPage /></RequireRole>), },
    { path: "vacunas", element: <VacunasPage /> },
    { path: "admin-vacunas", element: (<RequireRole allow={["ADMIN"]}><VacunasAdminPage /></RequireRole>), },
    { path: "mis-vacunaciones", element: <VacunacionesPage /> },
    { path: "vacunaciones", element: (<RequireRole allow={["ADMIN"]}><VacunacionesAdminPage /></RequireRole>), },
    { path: "pagos", element:<MisPagosPage />},
    { path: "medicamentos", element:<MedicamentosPage />},
    { path: "clientes", element: (<RequireRole allow={["ADMIN"]}><ClientesPage /></RequireRole>), },
    { path: "veterinarios", element: <VeterinariosPage />},
    { path: "users", element: (<RequireRole allow={["ADMIN"]}><UsersPage /></RequireRole>), },
    { path: "forbidden", element: <Forbidden /> },
  ],
};
