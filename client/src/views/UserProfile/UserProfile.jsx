// UserProfile.js
import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { useDispatch } from "react-redux";
import { searchUserByEmail, updateUser, deleteUser } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import validation from "../../utils/validation";
import items from "../../utils/items.json";

function UserProfile() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    full_name: "",
    phone_number: "",
    start_date: "",
    preferred_language: "english",
    how_found: "",
    newsletter_subscription: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(searchUserByEmail(email))
      .then((response) => {
        setUserData(response);
      })
      .catch((error) => {
        alert("No se ha encontrado un usuario con ese email");
        navigate("/");
      });
  }, [dispatch, email, navigate]);

  const generateTag = (item) => {
    switch (item.type) {
      case "text":
      case "date":
      case "tel":
      case "select":
      case "radio":
      case "checkbox":
        return (
          <tr key={item.name}>
            <td>
              <label>{item.label}:</label>
            </td>
            <td>
              {item.type === "select" ? (
                <select
                  name={item.name}
                  value={editUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                  className={styles.input}
                >
                  {item.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : item.type === "radio" ? (
                item.options.map((option) => (
                  <div key={option.value}>
                    <input
                      type="radio"
                      name={item.name}
                      value={option.value}
                      checked={editUser[item.name] === option.value}
                      onChange={handleInputChange}
                      required={item.required}
                    />
                    <label>{option.label}</label>
                  </div>
                ))
              ) : item.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={item.name}
                  checked={editUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                />
              ) : item.type === "tel" ? (
                <input
                  type="number"
                  name={item.name}
                  value={editUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                  className={styles.input}
                />
              ) : (
                <input
                  type={item.type}
                  name={item.name}
                  value={editUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                  className={styles.input}
                />
              )}
              {errors[item.name] && <span>{errors[item.name]}</span>}
            </td>
          </tr>
        );

      case "submit":
        return (
          <tr key={item.name}>
            <td colSpan="2">
              <button type="submit" key={item.name} className={styles.submit}>
                {item.label}
              </button>
            </td>
          </tr>
        );

      default:
        return null;
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Si es un checkbox, actualiza el estado con el valor 'checked'
    const newValue = type === "checkbox" ? checked : value;

    setEditUser({
      ...editUser,
      [name]: newValue,
    });

    setErrors(
      validation({
        ...editUser,
        [name]: newValue,
      })
    );
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(email))
      .then((response) => {
        alert("Usuario eliminado con éxito!");
        navigate("/");
      })
      .catch((error) => {
        alert("Hubo un error al eliminar el usuario, vuelva a intentar");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errores = Object.values(errors);
    if (errores && errores.length > 1) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      dispatch(updateUser(editUser, userData.email))
        .then((response) => {
          alert(response.message);
          setUserData(response.user);
          setEdit(false);
        })
        .catch((error) => {
          alert("Hubo un error al editar el usuario, vuelva a intentar");
        });
    }
  };

  const generateTableRow = (label, value) => (
    <tr key={label}>
      <td>{label}:</td>
      <td>{value}</td>
    </tr>
  );

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
    <div className={styles.UserProfile}>
      <div className={styles.title}>
        <h1>Perfil de Usuario</h1>
      </div>
      <div className={styles.UserProfileContainer}>
        <div className={styles.UserData}>
          <h2>Datos Actuales</h2>
          <table>
            <tbody>
              {generateTableRow("Email", userData?.email)}
              {generateTableRow("Nombre completo", userData?.name)}
              {generateTableRow("Número de teléfono", userData?.phone)}
              {generateTableRow(
                "Fecha de inicio",
                userData?.dateStart !== null
                  ? userData?.dateStart
                  : "No especificado"
              )}
              {generateTableRow(
                "Idioma preferido",
                languageTranslations[userData?.language]
              )}
              {generateTableRow(
                "Nos conociste por",
                findUsTranslations[userData?.findUs]
              )}
              {generateTableRow(
                "¿Deseas recibir nuestro boletín informativo?",
                userData?.newsletter ? "Sí" : "No"
              )}
            </tbody>
          </table>
          {!edit && (
            <div className={styles.EditButton}>
              <button onClick={() => setEdit(true)}>Editar</button>
            </div>
          )}
          {edit && (
            <div>
              <button onClick={() => setEdit(false)}>Cancelar</button>
              <button onClick={() => handleDeleteUser()} className={styles.delete}>Eliminar</button>
            </div>
          )}
        </div>
        {edit && (
          <div className={styles.EditUserData}>
            <h2>Editar Datos del Usuario</h2>
            <form onSubmit={handleSubmit}>
              {items.items.map((item) => generateTag(item))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
