import { Alert, Button, Paper, Stack, TextField, Typography, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await register({ username, email, password });
      navigate("/dashboard/mascotas", { replace: true });
    } catch {
      setError("No se pudo registrar. Revisa los datos o intenta más tarde.");
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
        zIndex: 1200,
        overflowY: "auto",
        py: 4
      }}
    >
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
          maxWidth: 500, 
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
              Crea tu cuenta
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
              Únete y ayuda a un peludito hoy mismo
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
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              boxShadow: "0 8px 20px rgba(139, 69, 19, 0.4)",
              "&:hover": {
                bgcolor: "#6d360f",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 25px rgba(139, 69, 19, 0.5)",
              },
              transition: "all 0.3s ease"
            }}
          >
            Comenzar mi aventura
          </Button>

          <Button 
            variant="text" 
            onClick={() => navigate("/auth/login")}
            sx={{ 
              color: "#2d4a22", 
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(45, 74, 34, 0.08)" }
            }}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Stack>
      </Paper>
      
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mt: 4 }}>
        © 2026 Huellitas Felices - Cada registro es una vida salvada.
      </Typography>
    </Box>
  );
}