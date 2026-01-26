import { useEffect, useState } from "react";
import { pagoService } from "../../services/pago.service";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function Pagos() {
  const [pagos, setPagos] = useState<any[]>([]);
  const [monto, setMonto] = useState("");
  const [metodo, setMetodo] = useState("");

  const cargarPagos = async () => {
    const res = await pagoService.getAll();
    setPagos(res.data);
  };

  const guardarPago = async () => {
    await pagoService.create({
      monto: Number(monto),
      metodo,
      fecha: new Date(),
    });
    setMonto("");
    setMetodo("");
    cargarPagos();
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Registro de Pagos</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <TextField
          label="Método"
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
        />
        <Button variant="contained" onClick={guardarPago}>
          Guardar
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Monto</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pagos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.monto}</TableCell>
              <TableCell>{p.metodo}</TableCell>
              <TableCell>{new Date(p.fecha).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
