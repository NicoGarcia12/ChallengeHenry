import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUserByEmail } from "../../redux/actions"; // Importa la acción correspondiente

function SearchBar() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    // Llamar a la acción para buscar el correo electrónico
    dispatch(searchUserByEmail(email))
      .then((response) => {
        navigate(`/userprofile/${email}`);
      })
      .catch((error) => {
        alert("Correo electrónico no encontrado en la base de datos");
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Buscar email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
