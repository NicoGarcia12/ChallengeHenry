import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { applyFilters } from "../../redux/actions";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("All");
  const [howFound, setHowFound] = useState("All");
  const [newsletter, setNewsletter] = useState("All");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(applyFilters({ language, howFound, newsletter, email }));
  }, [dispatch, language, howFound, newsletter, email]);

  return (
    <div className={styles.filtersContainer}>
      <div>
        <label>Buscar por email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Idioma preferido:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="All">Todos</option>
          <option value="english">Inglés</option>
          <option value="spanish">Español</option>
          <option value="french">Francés</option>
          <option value="german">Alemán</option>
        </select>
      </div>
      <div>
        <label>¿Cómo nos conoció?:</label>
        <select
          value={howFound}
          onChange={(e) => {
            setHowFound(e.target.value);
          }}
        >
          <option value="All">Todos</option>
          <option value="friends">Amigos</option>
          <option value="online_search">Búsqueda en línea</option>
          <option value="advertisement">Publicidad</option>
        </select>
      </div>
      <div>
        <label>¿Quiere recibir nuestro boletín informativo?:</label>
        <select
          value={newsletter}
          onChange={(e) => {
            setNewsletter(e.target.value);
          }}
        >
          <option value="All">Todos</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
