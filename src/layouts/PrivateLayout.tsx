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
import PaymentsIcon from "@mui/icons-material/Payments";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EventIcon from "@mui/icons-material/Event";
import HealingIcon from "@mui/icons-material/Healing";
import MedicationIcon from "@mui/icons-material/Medication";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";

const drawerWidth = 260;

type NavItem = { label: string; to: string; icon: JSX.Element; roles?: string[] };

const navItems: NavItem[] = [
  { label: "Inicio", to: "/dashboard", icon: <DashboardIcon /> },
  { label: "Mascotas", to: "/dashboard/mascotas", icon: <PetsIcon /> },
  { label: "Recetas", to: "/dashboard/recetas", icon: <ReceiptLongIcon /> },
  { label: "Posts", to: "/dashboard/posts", icon: <ArticleIcon /> },
  { label: "Vacunas", to: "/dashboard/vacunas", icon: <VaccinesIcon /> },
  { label: "Citas", to: "/dashboard/citas", icon: <EventIcon /> },
  { label: "Consultas", to: "/dashboard/consultas", icon: <HealingIcon /> },
  { label: "Clientes", to: "/dashboard/clientes", icon: <PersonIcon />, roles: ["ADMIN"] },
  { label: "Veterinarios", to: "/dashboard/veterinarios", icon: <MedicalServicesIcon />, roles: ["ADMIN"] },
  { label: "Vacunaciones", to: "/dashboard/vacunaciones", icon: <VaccinesIcon />, roles: ["ADMIN"] },
  { label: "Users", to: "/dashboard/users", icon: <GroupIcon />, roles: ["ADMIN"] },
];

export default function PrivateLayout(): JSX.Element {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = user?.role || "USER";

  const visibleItems = navItems.filter(item => !item.roles || item.roles.includes(role));

  const onGo = (to: string) => { navigate(to); setOpen(false); };
  const onLogout = () => { logout(); navigate("/", { replace: true }); };

  const drawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>Panel</Typography>
        <Typography variant="body2" color="text.secondary">{user?.email || user?.username}</Typography>
        <Typography variant="caption" color="text.secondary">Rol: {role}</Typography>
      </Box>
      <Divider />
      <List>
        {visibleItems.map(item => {
          const selected = location.pathname === item.to;
          return (
            <ListItemButton key={item.to} selected={selected} onClick={() => onGo(item.to)}
              sx={{ "&.Mui-selected": { bgcolor: "rgba(25, 118, 210, 0.08)", borderRight: "4px solid #1976d2" } }}>
              <ListItemIcon sx={{ color: selected ? '#1976d2' : 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: selected ? 'bold' : 'normal', color: selected ? '#1976d2' : 'inherit' }} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 2, py: 2 }}>
        <Button fullWidth variant="outlined" color="error" onClick={onLogout}>Cerrar Sesión</Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Sistema Veterinario</Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Ir al público</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>{drawer}</Drawer>
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}><Outlet /></Box>
    </Box>
  );
}
