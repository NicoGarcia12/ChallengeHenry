import React, { useEffect, useState } from "react";
import "./UserProfile.module.css";
import { useDispatch } from "react-redux";
import { searchUserByEmail } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchUserByEmail(email))
      .then((response) => {
        setUserData(response);
      })
      .catch((error) => {
        alert("No se ha encontrado un usuario con ese email");
        navigate("/");
      });
  }, [dispatch, email]);

  // Objeto de traducción para el idioma preferido
  const languageTranslations = {
    english: "Inglés",
    french: "Francés",
    german: "Alemán",
    spanish: "Español",
  };

  // Objeto de traducción para la forma de conocernos
  const findUsTranslations = {
    friends: "Amigos",
    online_search: "Búsqueda en línea",
    advertisement: "Publicidad",
  };

  return (
    <div className="UserProfile">
      {userData ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p>Nombre: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.phone}</p>
          <p>
            Fecha de inicio:{" "}
            {userData.dateStart !== null
              ? userData.dateStart
              : "No especificado"}
          </p>
          <p>Lenguaje preferido: {languageTranslations[userData.language]}</p>
          <p>¿Cómo nos conociste?: {findUsTranslations[userData.findUs]}</p>

          <p>
            ¿Deseas recibir nuestro boletín informativo?:
            {userData.newsletter ? " Sí" : " No"}
          </p>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}

export default UserProfile;
