import { useMemo } from "react";

export default function DashboardHome() {
  const fundadores = ["Dylan Fernández", "Michael Lidioma", "Mateo Mancheo", "Jossue Guerrero"];

  // Simulamos datos para las estadísticas
  const stats = useMemo(() => [
    { label: "Mascotas Rescatadas", value: "124", color: "text-primary", icon: "🐾" },
    { label: "Adopciones Exitosas", value: "89", color: "text-success", icon: "🏠" },
    { label: "Usuarios Activos", value: "45", color: "text-info", icon: "👤" },
  ], []);

  return (
    <div className="container-fluid py-4">
      {/* Encabezado Principal */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="p-5 mb-4 bg-success text-white rounded-4 shadow-sm position-relative overflow-hidden" 
               style={{ background: "linear-gradient(135deg, #2d4a22 0%, #4a7c36 100%)" }}>
            <div className="position-relative" style={{ zIndex: 1 }}>
              <h1 className="display-4 fw-bold">Huellitas <span style={{ color: "#d2b48c" }}>Felices</span> 🐾</h1>
              <p className="col-md-8 fs-5">
                Bienvenido al centro de control. Aquí gestionamos cada vida salvada y cada final feliz. 
                Gracias por ser parte del cambio.
              </p>
            </div>
            <div className="position-absolute bottom-0 end-0 p-3 opacity-25">
              <span style={{ fontSize: "150px" }}>🐕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div className="card border-0 shadow-sm rounded-4 h-100 p-3">
              <div className="card-body d-flex align-items-center">
                <div className="display-5 me-3">{stat.icon}</div>
                <div>
                  <h6 className="text-muted mb-0">{stat.label}</h6>
                  <h2 className={`fw-bold mb-0 ${stat.color}`}>{stat.value}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de la Empresa y Fundadores */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Nuestra Misión</h4>
              <p className="text-muted lead">
                Transformar la realidad de los animales en situación de abandono, brindándoles una segunda oportunidad
                llena de amor y cuidados dignos.
              </p>
              <hr className="my-4" />
              <h5 className="fw-bold mb-3">Equipo de Fundadores</h5>
              <div className="row">
                {fundadores.map((nombre, i) => (
                  <div className="col-sm-6 mb-3" key={i}>
                    <div className="d-flex align-items-center p-2 bg-light rounded-3">
                      <div className="bg-success rounded-circle me-2" style={{ width: "10px", height: "10px" }}></div>
                      <span className="fw-medium">{nombre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 bg-warning-subtle h-100">
            <div className="card-body p-4 text-center d-flex flex-column justify-content-center">
              <h1 className="mb-3">📢</h1>
              <h5 className="fw-bold">Aviso del Sistema</h5>
              <p className="small text-dark-emphasis">
                El menú lateral (Drawer) se está cargando en la estructura principal. 
                Utiliza las rutas de la izquierda para navegar entre Mascotas, Usuarios y Pagos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}