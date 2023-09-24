import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"; // Asegúrate de importar tu componente SearchBar
import styles from "./Navbar.module.css"
function Navbar() {
  return (
    <nav>
      <div className={styles.Navbar}>
        <div>
          <h1>Henry Challenge</h1>
        </div>
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
