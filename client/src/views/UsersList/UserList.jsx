import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/actions";
import { Link } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const languageTranslations = {
    english: "Inglés",
    french: "Francés",
    german: "Alemán",
    spanish: "Español",
  };

  const findUsTranslations = {
    friends: "Amigos",
    online_search: "Búsqueda en línea",
    advertisement: "Publicidad",
  };

  const deleteUserList = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <div>
      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha de inicio</th>
              <th>Lenguaje preferido</th>
              <th>¿Cómo nos conociste?</th>
              <th>Boletín informativo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.dateStart !== null ? user.dateStart : "No especificado"}
                </td>
                <td>{languageTranslations[user.language]}</td>
                <td>{findUsTranslations[user.findUs]}</td>
                <td>{user.newsletter ? "Sí" : "No"}</td>
                <td>
                  <Link to={`/userprofile/${user.email}`}>
                    <button>Ver perfil</button>
                  </Link>
                  <button onClick={() => deleteUserList(user.email)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
