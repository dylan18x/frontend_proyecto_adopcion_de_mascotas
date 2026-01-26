import { useEffect, useState } from "react";
import { facturaService } from "../../services/factura.service";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function Factura() {
  const [facturas, setFacturas] = useState<any[]>([]);

  useEffect(() => {
    facturaService.getAll().then((res) => setFacturas(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Facturas</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facturas.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.id}</TableCell>
              <TableCell>{f.total}</TableCell>
              <TableCell>{new Date(f.fecha).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
