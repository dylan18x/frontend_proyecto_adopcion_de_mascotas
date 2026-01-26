import { useState } from "react";
import axios from "axios";

export default function TiendaPage() {
  const [data, setData] = useState({
    producto: "",
    precio: 0,
    cantidad: 1,
    cliente: "",
  });

  const comprar = async () => {
    await axios.post("http://localhost:3000/tienda/compra", data);
    alert("Compra realizada");
  };

  return (
    <div className="container">
      <h3>Tienda de mascotas</h3>

      <input placeholder="Producto" onChange={e => setData({ ...data, producto: e.target.value })} />
      <input placeholder="Precio" type="number" onChange={e => setData({ ...data, precio: +e.target.value })} />
      <input placeholder="Cantidad" type="number" onChange={e => setData({ ...data, cantidad: +e.target.value })} />
      <input placeholder="Cliente" onChange={e => setData({ ...data, cliente: e.target.value })} />

      <button onClick={comprar}>Comprar</button>
    </div>
  );
}
