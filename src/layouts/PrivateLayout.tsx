import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, type JSX } from "react";
import { useAuth } from "../context/AuthContext";

// Iconos existentes
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; 
import PetsIcon from "@mui/icons-material/Pets";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

// --- NUEVOS ICONOS PARA TUS MÓDULOS ---
import EventIcon from "@mui/icons-material/Event";          // Para Citas
import HealingIcon from "@mui/icons-material/Healing";      // Para Consultas
import MedicationIcon from "@mui/icons-material/Medication"; // Para Medicamentos

// Nuevos iconos para tus secciones
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; 
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; 
import VaccinesIcon from "@mui/icons-material/Vaccines"; 

const drawerWidth = 260;

type NavItem = {
  label: string;
  to: string;
  icon: JSX.Element;
  roles?: string[];
};

const navItems: NavItem[] = [
  { label: "Inicio", to: "/dashboard", icon: <DashboardIcon /> },
    { label: "Citas", to: "/dashboard/citas", icon: <EventIcon /> },
  { label: "Consultas", to: "/dashboard/consultas", icon: <HealingIcon /> },
  { label: "Medicamentos", to: "/dashboard/medicamentos", icon: <MedicationIcon /> },
  { label: "Clientes", to: "/dashboard/clientes", icon: <PersonIcon /> },
  { label: "Veterinarios", to: "/dashboard/veterinarios", icon: <MedicalServicesIcon /> }, 
  { label: "Mascotas", to: "/dashboard/mascotas", icon: <PetsIcon /> }, 
  { label: "Recetas", to: "/dashboard/recetas", icon: <ReceiptLongIcon /> },
  { label: "Vacunas", to: "/dashboard/vacunas", icon: <LocalHospitalIcon /> },
  { label: "Vacunaciones", to: "/dashboard/vacunaciones", icon: <VaccinesIcon /> },
  { label: "Categorías", to: "/dashboard/categories", icon: <CategoryIcon /> },
  { label: "Posts", to: "/dashboard/posts", icon: <ArticleIcon /> },
  { label: "Pagos", to: "/dashboard/pagos", icon: <PaymentsIcon /> },
  { label: "Facturas", to: "/dashboard/facturas", icon: <ReceiptLongIcon /> },
  { label: "Historial Médico", to: "/dashboard/historial-medico", icon: <MedicalInformationIcon /> },
  { label: "Users", to: "/dashboard/users", icon: <GroupIcon />, roles: ["ADMIN"] },
  { label: "Tienda", to: "/dashboard/tienda", icon: <CategoryIcon /> },
];

export default function PrivateLayout(): JSX.Element {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const role = (user?.role || "USER").toUpperCase();
  // Filtramos los items según el rol del usuario
  const visibleItems = navItems.filter((i) => !i.roles || i.roles.map((x) => x.toUpperCase()).includes(role));

  const onGo = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  const onLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>Panel</Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || user?.username || ""}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Rol: {role}
        </Typography>
      </Box>

      <Divider />

      <List>
        {visibleItems.map((item) => {
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
                },
              }}
            >
              <ListItemIcon sx={{ color: selected ? '#1976d2' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: selected ? 'bold' : 'normal',
                  color: selected ? '#1976d2' : 'inherit'
                }} 
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ px: 2, py: 2 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          color="error" 
          onClick={onLogout}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema Veterinario
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Ir al público
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        {drawer}
      </Drawer>

      <Toolbar /> 

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: '100%',
          transition: 'margin 0.3s'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}