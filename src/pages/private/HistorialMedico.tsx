import { useEffect, useState } from "react";
import { historialMedicoService } from "../../services/historialMedico.service";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";

export default function HistorialMedico() {
  const [historial, setHistorial] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [mascotaId, setMascotaId] = useState("");

  useEffect(() => {
    // cargar mascotas
    axios.get("http://localhost:3000/mascotas").then((res) => {
      setMascotas(res.data);
    });
  }, []);

  useEffect(() => {
    if (!mascotaId) return;

    historialMedicoService.getAll().then((res) => {
      const filtrado = res.data
        .filter((h: any) => h.mascota?.id === Number(mascotaId))
        .sort(
          (a: any, b: any) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );

      setHistorial(filtrado);
    });
  }, [mascotaId]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Historial Médico por Mascota
      </Typography>

      <Select
        fullWidth
        value={mascotaId}
        onChange={(e) => setMascotaId(e.target.value)}
        displayEmpty
        sx={{ mb: 3 }}
      >
        <MenuItem value="">Seleccione una mascota</MenuItem>
        {mascotas.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            {m.nombre}
          </MenuItem>
        ))}
      </Select>

      {historial.map((h) => (
        <Card key={h.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography><b>Tipo:</b> {h.tipo}</Typography>
            <Typography><b>Descripción:</b> {h.descripcion}</Typography>
            <Typography>
              <b>Fecha:</b> {new Date(h.fecha).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
