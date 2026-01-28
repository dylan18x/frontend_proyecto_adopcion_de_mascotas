import type { RouteObject } from "react-router-dom";
import DashboardHome from "../pages/private/DashboardHome";
import PostsPage from "../pages/private/PostsPage";
import UsersPage from "../pages/admin/UsersPage";
import Forbidden from "../pages/private/Forbidden";
import RequireRole from "./RequireRole";
import ClientesPage from "../pages/admin/ClientesPage";
import VeterinariosPage from "../pages/private/VeterinariosPage";
import MascotasPage from "../pages/private/MascotaPage";
<<<<<<< HEAD

import RecetasPage from "../pages/private/RecetasPage";
import RecetasAdminPage from "../pages/admin/RecetasAdminPage";

=======
import CitasPage from "../pages/private/CitasPage"; 
import CitasAdminPage from "../pages/admin/CitasAdminPage"; 
import ConsultasPage from "../pages/private/ConsultasPage";
import ConsultasAdminPage from "../pages/admin/ConsultasAdminPage";
import HistorialMedicoAdminPage from "../pages/admin/HistorialMedicoAdminPage";
import PagosAdminPage from "../pages/admin/PagosAdminPage";
import RecetasPage from "../pages/private/RecetasPage";
import RecetasAdminPage from "../pages/admin/RecetasAdminPage";
>>>>>>> 451c22276a657237bb8b06562352b75e310ab2a9
import VacunasPage from "../pages/private/VacunasPage";
import VacunasAdminPage from "../pages/admin/VacunasAdminPage";

import VacunacionesPage from "../pages/private/VacunacionesPage";
import VacunacionesAdminPage from "../pages/admin/VacunacionesAdminPage";

<<<<<<< HEAD
import PagosAdminPage from "../pages/admin/PagosAdminPage";
import MisPagosPage from "../pages/private/Pagos"; 

=======
>>>>>>> 451c22276a657237bb8b06562352b75e310ab2a9
export const privateRoutes: RouteObject = {
  path: "/dashboard",
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "mascotas", element: <MascotasPage /> },
    { path: "posts", element: <PostsPage /> },

<<<<<<< HEAD
    { path: "recetas", element: <RecetasPage /> },
    { path: "admin-recetas", element: <RequireRole allow={["ADMIN"]}><RecetasAdminPage /></RequireRole> },

    { path: "vacunas", element: <VacunasPage /> },
    { path: "admin-vacunas", element: <RequireRole allow={["ADMIN"]}><VacunasAdminPage /></RequireRole> },

    { path: "mis-vacunaciones", element: <VacunacionesPage /> }, 
    { path: "vacunaciones", element: <RequireRole allow={["ADMIN"]}><VacunacionesAdminPage /></RequireRole> },

    { path: "mis-pagos", element: <MisPagosPage /> },
=======
    // --- CITAS ---
    { path: "citas", element: <CitasPage /> },
    { 
      path: "admin-citas", 
      element: <RequireRole allow={["ADMIN"]}><CitasAdminPage /></RequireRole> 
    },

    // --- CONSULTAS ---
    { path: "consultas", element: <ConsultasPage /> },
    { 
      path: "admin-consultas", 
      element: <RequireRole allow={["ADMIN"]}><ConsultasAdminPage /></RequireRole> 
    },

    { 
      path: "admin-historial", 
      element: <RequireRole allow={["ADMIN"]}><HistorialMedicoAdminPage /></RequireRole> 
    },

    // --- RECETAS ---
    { path: "recetas", element: <RecetasPage /> },
    { 
      path: "admin-recetas", 
      element: <RequireRole allow={["ADMIN"]}><RecetasAdminPage /></RequireRole> 
    },
    
>>>>>>> 451c22276a657237bb8b06562352b75e310ab2a9
    { 
      path: "pagos", 
      element: <RequireRole allow={["ADMIN"]}><PagosAdminPage /></RequireRole> 
    },

<<<<<<< HEAD
    { path: "clientes", element: <RequireRole allow={["ADMIN"]}><ClientesPage /></RequireRole> },
    { path: "veterinarios", element: <VeterinariosPage />},
=======
    // --- VACUNAS Y VACUNACIONES ---
    { path: "vacunas", element: <VacunasPage /> },
    { path: "admin-vacunas", element: <RequireRole allow={["ADMIN"]}><VacunasAdminPage /></RequireRole> },
    { path: "mis-vacunaciones", element: <VacunacionesPage /> }, 
    { 
      path: "vacunaciones", 
      element: <RequireRole allow={["ADMIN"]}><VacunacionesAdminPage /></RequireRole> 
    },
        { path: "clientes", element: <RequireRole allow={["ADMIN"]}><ClientesPage /></RequireRole> },
    { path: "veterinarios", element: <RequireRole allow={["ADMIN"]}><VeterinariosPage /></RequireRole> },
>>>>>>> 451c22276a657237bb8b06562352b75e310ab2a9
    { path: "users", element: <RequireRole allow={["ADMIN"]}><UsersPage /></RequireRole> },
    
    { path: "forbidden", element: <Forbidden /> },
  ],
};