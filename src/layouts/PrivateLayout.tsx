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

const drawerWidth = 260;

type NavItem = { label: string; to: string; icon: JSX.Element; roles?: string[] };

const navItems: NavItem[] = [
  { label: "Inicio", to: "/dashboard", icon: <DashboardIcon /> },
  { label: "Mascotas", to: "/dashboard/mascotas", icon: <PetsIcon /> },
  
  // --- SECCIÓN RECETAS ---
  { label: "Mis Recetas", to: "/dashboard/recetas", icon: <ReceiptLongIcon />, roles: ["USER"] },
  { label: "Gestionar Recetas", to: "/dashboard/admin-recetas", icon: <MedicationIcon />, roles: ["ADMIN"] },
  
  // --- SECCIÓN VACUNAS ---
  { label: "Catálogo Vacunas", to: "/dashboard/vacunas", icon: <VaccinesIcon />, roles: ["USER"] },
  { label: "Gestionar Vacunas", to: "/dashboard/admin-vacunas", icon: <VaccinesIcon />, roles: ["ADMIN"] },
  
  // --- SECCIÓN VACUNACIONES ---
  { label: "Mis Vacunaciones", to: "/dashboard/mis-vacunaciones", icon: <VaccinesIcon />, roles: ["USER"] },
  { label: "Control Vacunaciones", to: "/dashboard/vacunaciones", icon: <VaccinesIcon />, roles: ["ADMIN"] },

  // --- SECCIÓN PAGOS ---
  { label: "Mis Pagos", to: "/dashboard/mis-pagos", icon: <ReceiptLongIcon />, roles: ["USER"] },
  { label: "Gestión de Pagos", to: "/dashboard/pagos", icon: <PaymentsIcon />, roles: ["ADMIN"] },

  { label: "Citas", to: "/dashboard/citas", icon: <EventIcon /> },
  { label: "Consultas", to: "/dashboard/consultas", icon: <HealingIcon /> },
  { label: "Posts", to: "/dashboard/posts", icon: <ArticleIcon /> },
  
  { label: "Clientes", to: "/dashboard/clientes", icon: <PersonIcon />, roles: ["ADMIN"] },
  { label: "Veterinarios", to: "/dashboard/veterinarios", icon: <MedicalServicesIcon />, roles: ["ADMIN"] },
  { label: "Users", to: "/dashboard/users", icon: <GroupIcon />, roles: ["ADMIN"] },
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
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>VetDylan 🐾</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>{user?.email || user?.username}</Typography>
        <Typography variant="caption" sx={{ display: 'inline-block', mt: 1, px: 1, bgcolor: '#e3f2fd', color: '#1976d2', borderRadius: 1 }}>
          Rol: {role}
        </Typography>
      </Box>
      <Divider />
      <List>
        {visibleItems.map(item => {
          const selected = location.pathname === item.to;
          return (
            <ListItemButton 
              key={item.to} 
              selected={selected} 
              onClick={() => onGo(item.to)}
              sx={{ 
                "&.Mui-selected": { 
                  bgcolor: "rgba(25, 118, 210, 0.08)", 
                  borderRight: "4px solid #1976d2",
                } 
              }}
            >
              <ListItemIcon sx={{ color: selected ? '#1976d2' : 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: selected ? 'bold' : 'normal', 
                  color: selected ? '#1976d2' : 'inherit',
                  fontSize: '0.9rem'
                }} 
              />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 2, py: 2 }}>
        <Button fullWidth variant="contained" color="error" onClick={onLogout} size="small">
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: '#f8f9fa' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Sistema Veterinario</Typography>
          <Button color="inherit" onClick={() => navigate("/")} sx={{ textTransform: 'none' }}>Vista Pública</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>{drawer}</Drawer>
      <Toolbar /> 
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}