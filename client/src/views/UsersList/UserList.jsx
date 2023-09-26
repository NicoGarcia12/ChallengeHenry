import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import styles from "./UserList.module.css";

function UserList() {
  const dispatch = useDispatch();
  const filteredUsers = useSelector((state) => state.filteredUsers);

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
    alert("Usuario eliminado con éxito!");
  };

  return (
    <div className={styles.UserList}>
      <div className={styles.title}>
        <h1>Lista de Usuarios</h1>
      </div>
      <Filters />
      <div className={styles.UserListContainer}>
        {filteredUsers.length === 0 ? (
          <p>No hay usuarios registrados</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre completo</th>
                  <th>Número de teléfono</th>
                  <th>Fecha de inicio</th>
                  <th>Idioma preferido</th>
                  <th>Nos conoció por</th>
                  <th>¿Desea recibir nuestro boletín informativo?</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.dateStart !== null
                        ? user.dateStart
                        : "No especificado"}
                    </td>
                    <td>{languageTranslations[user.language]}</td>
                    <td>{findUsTranslations[user.findUs]}</td>
                    <td>{user.newsletter ? "Sí" : "No"}</td>
                    <td>
                      <Link to={`/userprofile/${user.email}`}>
                        <button>Ver perfil</button>
                      </Link>
                      <button onClick={() => deleteUserList(user.email)}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
