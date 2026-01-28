import { Alert, Button, Paper, Stack, TextField, Typography, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Asegúrate de tener instalado @mui/icons-material
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { JSX } from "react";

type LocationState = { from?: string };

export default function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login({ username, password });
      navigate(state.from || "/dashboard", { replace: true });
    } catch {
      setError("Credenciales inválidas o error de servidor.");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        width: "100%",
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #2d4a22 0%, #1a2a15 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200
      }}
    >
      {/* BOTÓN VOLVER (Esquina superior izquierda) */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
        }}
      >
        Volver al inicio
      </Button>

      {/* Logo que también regresa a home */}
      <Box 
        onClick={() => navigate("/")}
        sx={{ 
          cursor: "pointer", 
          mb: 4, 
          display: "flex", 
          alignItems: "center", 
          color: "white",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" }
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Huellitas <span style={{ color: "#d2b48c" }}>Felices</span> 🐾
        </Typography>
      </Box>

      <Paper 
        elevation={24} 
        sx={{ 
          p: { xs: 4, md: 6 }, 
          maxWidth: 450, 
          width: "90%",
          borderRadius: "32px", 
          bgcolor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
        }}
      >
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#2d4a22" }}>
              Bienvenido
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
              Ingresa para gestionar tus adopciones
            </Typography>
          </Box>

          {error ? (
            <Alert severity="error" sx={{ borderRadius: "16px" }}>
              {error}
            </Alert>
          ) : null}

          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ 
              py: 2, 
              borderRadius: "50px", 
              bgcolor: "#8b4513", 
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#6d360f" }
            }}
          >
            Entrar a mi cuenta
          </Button>

          <Button 
            variant="text" 
            onClick={() => navigate("/auth/register")}
            sx={{ 
              color: "#2d4a22", 
              fontWeight: "bold",
              textTransform: "none"
            }}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Button>
        </Stack>
      </Paper>
      
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mt: 4 }}>
        © 2026 Huellitas Felices - Adopción Responsable
      </Typography>
    </Box>
  );
}