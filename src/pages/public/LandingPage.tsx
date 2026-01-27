import { useNavigate } from "react-router-dom";
import petImg from "./images/pet.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-100 p-0 animate__animated animate__fadeIn">

      {/* HERO */}
      <section
        className="w-100 text-white position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2d5a27 0%, #4a3728 100%)",
          padding: "120px 0",
        }}
      >
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark position-absolute top-0 w-100 py-4">
          <div className="container-fluid px-5">
            <a className="navbar-brand fw-bold d-flex align-items-center fs-3" href="/">
              <i
                className="bi bi-house-heart-fill me-2"
                style={{ color: "#a3cfbb" }}
              ></i>
              Huellitas{" "}
              <span style={{ color: "#d2b48c", marginLeft: "5px" }}>
                Felices
              </span>
            </a>

            <div className="ms-auto d-flex gap-3">
              <button
                onClick={() => navigate("/auth/login")}
                className="btn btn-outline-light rounded-pill px-4 fw-semibold border-2"
              >
                Ingresar
              </button>

              <button
                onClick={() => navigate("/auth/register")}
                className="btn btn-light text-success fw-bold rounded-pill px-4 shadow"
              >
                Unirse
              </button>
            </div>
          </div>
        </nav>

        {/* CONTENIDO */}
        <div className="container-fluid px-5 mt-5">
          <div className="row align-items-center">

            {/* TEXTO */}
            <div className="col-lg-6 py-5">
              <h1 className="display-2 fw-bold mb-4">
                Adopta un amigo <br />
                <span style={{ color: "#d2b48c" }}>para siempre.</span>
              </h1>

              <p className="lead mb-5 opacity-75 fs-4">
                Encuentra la compañía perfecta. Cientos de peluditos buscan un hogar lleno de amor.
              </p>

              <div className="d-flex gap-3">
                <button
                  onClick={() => navigate("/auth/register")}
                  className="btn btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg border-0 text-white"
                  style={{ backgroundColor: "#8b4513" }}
                >
                  ¡Quiero Adoptar!
                </button>

                <button
                  className="btn btn-lg px-4 py-3 fw-bold rounded-pill text-white border-white border-2"
                  style={{ backgroundColor: "transparent" }}
                >
                  Conocer más
                </button>
              </div>
            </div>

            {/* IMAGEN */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center position-relative">

             
              {/* IMAGEN */}
              <div className="position-relative z-1">
                <img
                  src={petImg}
                  alt="Mascota para adopción"
                  className="img-fluid rounded-4 shadow-lg border border-5 border-white border-opacity-25"
                  style={{
                    maxHeight: "450px",
                    objectFit: "cover",
                    transform: "rotate(2deg)",
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-light py-5">
        <div className="container text-center py-5">
          <h2 className="display-5 fw-bold mb-2">¿Cómo funciona?</h2>
          <p className="text-muted mb-5 fs-5">
            Tres simples pasos para cambiar una vida
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                icon: "search",
                title: "Busca",
                text: "Explora perfiles detallados de mascotas rescatadas.",
              },
              {
                icon: "heart-fill",
                title: "Conecta",
                text: "Agenda una cita y conoce a tu futuro compañero.",
              },
              {
                icon: "house-check-fill",
                title: "Adopta",
                text: "Completa el proceso y dale la bienvenida a su hogar.",
              },
            ].map((item, i) => (
              <div key={i} className="col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
                  <i className={`bi bi-${item.icon} fs-1 mb-3`}></i>
                  <h4 className="fw-bold">{item.title}</h4>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-4 text-center border-top bg-white">
        <p className="text-muted mb-0 small">
          © 2026 Huellitas Felices •{" "}
          <i className="bi bi-geo-alt-fill"></i> Quito, Ecuador
        </p>
      </footer>
    </div>
  );
}
