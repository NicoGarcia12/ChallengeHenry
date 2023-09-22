import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"; // Asegúrate de importar tu componente SearchBar

function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">Nombre de la Página</div>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <Link to="/users">
            <button>Lista de Usuarios</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
