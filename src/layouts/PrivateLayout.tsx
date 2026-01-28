import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, type JSX } from "react";
import { useAuth } from "../context/AuthContext";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import HealingIcon from "@mui/icons-material/Healing";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PaymentsIcon from "@mui/icons-material/Payments";
import MedicationIcon from "@mui/icons-material/Mediation";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

const drawerWidth = 260;

type NavItem = { label: string; to: string; icon: JSX.Element; roles?: string[] };

const navItems: NavItem[] = [
  { label: "Inicio", to: "/dashboard", icon: <DashboardIcon /> },
  { label: "Mascotas", to: "/dashboard/mascotas", icon: <PetsIcon /> },
  
<<<<<<< HEAD
  { label: "Mis Recetas", to: "/dashboard/recetas", icon: <ReceiptLongIcon />, roles: ["USER"] },
  { label: "Gestionar Recetas", to: "/dashboard/admin-recetas", icon: <MedicationIcon />, roles: ["ADMIN"] },
  
  { label: "Catálogo Vacunas", to: "/dashboard/vacunas", icon: <VaccinesIcon />, roles: ["USER"] },
  { label: "Gestionar Vacunas", to: "/dashboard/admin-vacunas", icon: <VaccinesIcon />, roles: ["ADMIN"] },
  
  { label: "Mis Vacunaciones", to: "/dashboard/mis-vacunaciones", icon: <VaccinesIcon />, roles: ["USER"] },
  { label: "Control Vacunaciones", to: "/dashboard/vacunaciones", icon: <VaccinesIcon />, roles: ["ADMIN"] },

  { label: "Mis Pagos", to: "/dashboard/mis-pagos", icon: <ReceiptLongIcon />, roles: ["USER"] },
  { label: "Gestión de Pagos", to: "/dashboard/pagos", icon: <PaymentsIcon />, roles: ["ADMIN"] },

  { label: "Citas", to: "/dashboard/citas", icon: <EventIcon /> },
  { label: "Consultas", to: "/dashboard/consultas", icon: <HealingIcon /> },
=======
  // --- CITAS ---
  { label: "Citas", to: "/dashboard/citas", icon: <EventIcon />, roles: ["USER"] },
  { label: "Citas", to: "/dashboard/admin-citas", icon: <EventIcon />, roles: ["ADMIN"] },
  
  // --- CONSULTAS ---
  { label: "Consultas", to: "/dashboard/consultas", icon: <HealingIcon />, roles: ["USER"] },
  { label: "Consulta", to: "/dashboard/admin-consultas", icon: <MedicalServicesIcon />, roles: ["ADMIN"] },

  // --- HISTORIAL MÉDICO (SOLO ADMIN) ---
  { label: "Historial medico", to: "/dashboard/admin-historial", icon: <HistoryEduIcon />, roles: ["ADMIN"] },
  
  // --- RECETAS ---
  { label: "Recetas", to: "/dashboard/recetas", icon: <ReceiptLongIcon />, roles: ["USER"] },
  { label: "Recetas", to: "/dashboard/admin-recetas", icon: <MedicationIcon />, roles: ["ADMIN"] },
  
  // --- FACTURACIÓN (SOLO ADMIN) ---
  { label: "Facturación", to: "/dashboard/pagos", icon: <PaymentsIcon />, roles: ["ADMIN"] },
  
  // --- VACUNACIONES ---
  { label: "Vacunaciones", to: "/dashboard/mis-vacunaciones", icon: <VaccinesIcon />, roles: ["USER"] },
  { label: "Vacunaciones", to: "/dashboard/vacunaciones", icon: <VaccinesIcon />, roles: ["ADMIN"] },
  
>>>>>>> 451c22276a657237bb8b06562352b75e310ab2a9
  { label: "Posts", to: "/dashboard/posts", icon: <ArticleIcon /> },
  
  // --- ADMINISTRACIÓN ---
  { label: "Clientes", to: "/dashboard/clientes", icon: <PersonIcon />, roles: ["ADMIN"] },
  { label: "Veterinarios", to: "/dashboard/veterinarios", icon: <MedicalServicesIcon />, roles: ["ADMIN"] },
  { label: "Usuarios Sistema", to: "/dashboard/users", icon: <GroupIcon />, roles: ["ADMIN"] },
];

export default function PrivateLayout(): JSX.Element {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const role = user?.role?.toUpperCase() || "USER";
  const visibleItems = navItems.filter(item => !item.roles || item.roles.includes(role));

  const onGo = (to: string) => { navigate(to); setOpen(false); };
  const onLogout = () => { logout(); navigate("/", { replace: true }); };

  const drawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Box sx={{ px: 2, py: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ color: '#2d5a27', fontWeight: 'bold' }}>VetDylan 🐾</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>{user?.email || user?.username}</Typography>
        <Typography variant="caption" sx={{ display: 'inline-block', mt: 1, px: 1, bgcolor: '#d8f3dc', color: '#2d5a27', borderRadius: 1, fontWeight: 'bold' }}>
          ACCESO: {role}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 0 }}>
        {visibleItems.map(item => {
          const selected = location.pathname === item.to;
          return (
            <ListItemButton 
              key={item.to} 
              selected={selected} 
              onClick={() => onGo(item.to)}
              sx={{ 
                py: 0.8,
                "&.Mui-selected": { 
                  bgcolor: "rgba(45, 90, 39, 0.08)", 
                  borderRight: "4px solid #2d5a27",
                  "& .MuiListItemIcon-root": { color: "#2d5a27" },
                  "& .MuiListItemText-primary": { color: "#2d5a27", fontWeight: 'bold' }
                } 
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: '0.82rem' }} 
              />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 2, py: 2 }}>
        <Button fullWidth variant="contained" sx={{ bgcolor: '#8b4513', '&:hover': { bgcolor: '#4a3728' }, borderRadius: '50px', textTransform: 'none' }} onClick={onLogout} size="small">
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: '#fcf9f5' }}>
      <AppBar position="fixed" sx={{ bgcolor: '#2d5a27', zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Panel Veterinario</Typography>
          <Button color="inherit" onClick={() => navigate("/")} sx={{ textTransform: 'none', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', px: 2, fontSize: '0.8rem' }}>
            Vista Pública
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>{drawer}</Drawer>
      <Toolbar /> 
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}