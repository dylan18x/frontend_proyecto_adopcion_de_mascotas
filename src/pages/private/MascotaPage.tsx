import { useEffect, useState, useMemo } from "react";
import {
  getMascotas,
  createMascota,
  updateMascota,
  deleteMascota,
  adoptarMascota,
  type MascotaDto
} from "../../services/mascotas.service";
import { createClient, type ClientDto } from "../../services/clientes.service";
import { useAuth } from "../../context/AuthContext";

export default function MascotasPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [pets, setPets] = useState<MascotaDto[]>([]);
  const [search, setSearch] = useState("");

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({
    nombre: "",
    especie: "",
    raza: ""
  });

  const [adoptPetId, setAdoptPetId] = useState<string | null>(null);
  const [adopcionCliente, setAdopcionCliente] =
    useState<Omit<ClientDto, "id">>({
      nombre: "",
      cedula: "",
      telefono: "",
      direccion: ""
    });

  const loadPets = async () => {
    const data = await getMascotas();
    setPets(data);
  };

  useEffect(() => {
    loadPets();
  }, []);

  const petsFiltradas = useMemo(() => {
    return pets.filter(
      p =>
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.especie.toLowerCase().includes(search.toLowerCase())
    );
  }, [pets, search]);

  const handleAddPet = async () => {
    if (!nombre || !especie || !raza) return;
    await createMascota({ nombre, especie, raza });
    setNombre(""); setEspecie(""); setRaza("");
    loadPets();
  };

  const startEdit = (p: MascotaDto) => {
    setEditingId(p.id);
    setEditingData({
      nombre: p.nombre,
      especie: p.especie,
      raza: p.raza
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await updateMascota(editingId, editingData);
    setEditingId(null);
    loadPets();
  };

  const removePet = async (id: string) => {
    if (!confirm("¿Eliminar mascota?")) return;
    await deleteMascota(id);
    loadPets();
  };

  const startAdopt = (id: string) => {
    setAdoptPetId(id);
  };

  const confirmAdopt = async () => {
    if (!adoptPetId) return;

    const cliente = await createClient(adopcionCliente);
    await adoptarMascota(adoptPetId, cliente.id);

    setAdoptPetId(null);
    setAdopcionCliente({
      nombre: "",
      cedula: "",
      telefono: "",
      direccion: ""
    });

    loadPets();
  };

  return (
    <div className="container py-5">
      <h3 className="text-success mb-4">Mascotas</h3>

      {/* SOLO ADMIN AGREGA */}
      {isAdmin && (
        <div className="row mb-4">
          <div className="col">
            <input className="form-control" placeholder="Nombre"
              value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Especie"
              value={especie} onChange={e => setEspecie(e.target.value)} />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Raza"
              value={raza} onChange={e => setRaza(e.target.value)} />
          </div>
          <div className="col">
            <button className="btn btn-success w-100" onClick={handleAddPet}>
              Añadir
            </button>
          </div>
        </div>
      )}

      <input className="form-control mb-3"
        placeholder="Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {petsFiltradas.map(p => (
            <tr key={p.id}>
              {editingId === p.id ? (
                <>
                  <td>
                    <input className="form-control"
                      value={editingData.nombre}
                      onChange={e => setEditingData({ ...editingData, nombre: e.target.value })}
                    />
                  </td>
                  <td>
                    <input className="form-control"
                      value={editingData.especie}
                      onChange={e => setEditingData({ ...editingData, especie: e.target.value })}
                    />
                  </td>
                  <td>
                    <input className="form-control"
                      value={editingData.raza}
                      onChange={e => setEditingData({ ...editingData, raza: e.target.value })}
                    />
                  </td>
                  <td>—</td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={saveEdit}>
                      Guardar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.nombre}</td>
                  <td>{p.especie}</td>
                  <td>{p.raza}</td>
                  <td>
                    {p.cliente
                      ? <span className="text-danger">Adoptado por: {p.cliente.nombre}</span>
                      : <span className="text-success">Disponible</span>
                    }
                  </td>
                  <td className="d-flex gap-2">
                    {!isAdmin && !p.cliente && (
                      <button className="btn btn-sm btn-success"
                        onClick={() => startAdopt(p.id)}>
                        Adoptar
                      </button>
                    )}

                    {isAdmin && (
                      <>
                        <button className="btn btn-sm btn-warning"
                          onClick={() => startEdit(p)}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-danger"
                          onClick={() => removePet(p.id)}>
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM ADOPCIÓN */}
      {adoptPetId && (
        <div className="card mt-4 p-3">
          <h5>Datos del cliente</h5>
          <div className="row g-2">
            <div className="col">
              <input className="form-control" placeholder="Nombre"
                value={adopcionCliente.nombre}
                onChange={e => setAdopcionCliente({ ...adopcionCliente, nombre: e.target.value })}
              />
            </div>
            <div className="col">
              <input className="form-control" placeholder="Cédula"
                value={adopcionCliente.cedula}
                onChange={e => setAdopcionCliente({ ...adopcionCliente, cedula: e.target.value })}
              />
            </div>
            <div className="col">
              <input className="form-control" placeholder="Teléfono"
                value={adopcionCliente.telefono}
                onChange={e => setAdopcionCliente({ ...adopcionCliente, telefono: e.target.value })}
              />
            </div>
            <div className="col">
              <input className="form-control" placeholder="Dirección"
                value={adopcionCliente.direccion}
                onChange={e => setAdopcionCliente({ ...adopcionCliente, direccion: e.target.value })}
              />
            </div>
            <div className="col">
              <button className="btn btn-success w-100" onClick={confirmAdopt}>
                Confirmar adopción
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
