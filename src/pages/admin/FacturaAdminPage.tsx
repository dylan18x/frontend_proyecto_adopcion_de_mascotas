import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip, CircularProgress 
} from "@mui/material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

export default function FacturaAdminPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarFacturas = async () => {
    try {
      setLoading(true);
      const res = await api.get("/factura"); 
      setFacturas(res.data.items || res.data || []);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarFacturas(); }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <ReceiptLongIcon sx={{ fontSize: 40, color: "#2d4a22" }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#2d4a22" }}>
          Control de Facturas
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "20px", border: "1px solid #e1eedd", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fdf7" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID Factura</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Método Pago</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Total</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}><CircularProgress color="success" /></TableCell>
              </TableRow>
            ) : facturas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>No se han emitido facturas.</TableCell>
              </TableRow>
            ) : (
              facturas.map((f) => (
                <TableRow key={f.id_factura} hover>
                  <TableCell sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    #{f.id_factura.split('-')[0].toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {f.pago?.cliente?.nombre || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(f.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={f.pago?.metodo_pago || 'Pendiente'} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: "#2d4a22" }}>
                    ${Number(f.total).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary"><VisibilityIcon /></IconButton>
                    <IconButton size="small" sx={{ color: "#d2b48c" }}><DownloadIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}