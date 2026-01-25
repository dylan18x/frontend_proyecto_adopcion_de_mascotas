import { useEffect, useState, useMemo } from "react";
import { getMascotas, type MascotaDto } from "../../services/mascotas.service";

export default function MascotasPage() {
  const [pets, setPets] = useState<MascotaDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMascotas().then((data) => {
      if (data) setPets(data);
    });
  }, []);

  const filteredPets = useMemo(() => {
    const list = pets || [];
    return list.filter(p => 
      p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      p.especie?.toLowerCase().includes(search.toLowerCase())
    );
  }, [pets, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h2 className="display-6 fw-bold text-success">🐾 Galería de Mascotas</h2>
          <p className="text-muted">Encuentra a tu nuevo mejor amigo o revisa los finales felices.</p>
        </div>
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control shadow-sm border-success" 
            placeholder="Buscar por nombre o especie..." 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredPets.length > 0 ? (
          filteredPets.map((p) => (
            <div className="col" key={p.id}>
              <div className={`card h-100 shadow-sm border-0 ${!p.cliente ? 'bg-light' : ''}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title mb-0">{p.nombre}</h5>
                    <span className={`badge rounded-pill ${p.cliente ? 'bg-secondary' : 'bg-success'}`}>
                      {p.cliente ? 'Adoptado' : 'Disponible'}
                    </span>
                  </div>
                  <p className="card-text text-muted mb-3">{p.especie} • {p.raza}</p>
                  
                  <div className="mt-auto p-3 rounded-3" style={{ backgroundColor: p.cliente ? '#f1f3f5' : '#e7f5ec' }}>
                    {p.cliente ? (
                      <p className="mb-0 small text-dark">
                        <strong>🏠 Hogar:</strong> {p.cliente.nombre}
                      </p>
                    ) : (
                      <p className="mb-0 small text-success fw-bold">
                        🌟 ¡Listo para ser adoptado!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No se encontraron mascotas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}