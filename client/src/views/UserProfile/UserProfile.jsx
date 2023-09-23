import React, { useEffect, useState } from "react";
import "./UserProfile.module.css";
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
  }, [dispatch, email]);

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
        alert(response.message);
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

  const generateTag = (item) => {
    switch (item.type) {
      case "text":
      case "date":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <input
              type={item.type}
              name={item.name}
              value={editUser[item.name]}
              onChange={handleInputChange}
              required={item.required}
            />
            <br />
            {errors[item.name] && <span>{errors[item.name]}</span>}
          </div>
        );
      case "tel":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <input
              type="number"
              name={item.name}
              value={editUser[item.name]}
              onChange={handleInputChange}
              required={item.required}
            />
            <br />
            {errors[item.name] && <span>{errors[item.name]}</span>}
          </div>
        );

      case "select":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <select
              name={item.name}
              value={editUser[item.name]}
              onChange={handleInputChange}
              required={item.required}
            >
              {item.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <br />
            {errors[item.name] && <span>{errors[item.name]}</span>}
          </div>
        );

      case "radio":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            {item.options.map((option) => (
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
                <br />
                {option.value === "advertisement" && errors[item.name] && (
                  <span>{errors[item.name]}</span>
                )}
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div key={item.name}>
            <input
              type="checkbox"
              name={item.name}
              checked={editUser[item.name]}
              onChange={handleInputChange}
              required={item.required}
            />
            <label>{item.label}</label>
          </div>
        );

      case "submit":
        return (
          <button type="submit" key={item.name} onClick={handleSubmit}>
            Guardar
          </button>
        );

      default:
        return null;
    }
  };

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
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Teléfono: {userData?.phone}</p>
      <p>
        Fecha de inicio:{" "}
        {userData?.dateStart !== null ? userData?.dateStart : "No especificado"}
      </p>
      <p>Lenguaje preferido: {languageTranslations[userData?.language]}</p>
      <p>¿Cómo nos conociste?: {findUsTranslations[userData?.findUs]}</p>
      <p>
        ¿Deseas recibir nuestro boletín informativo?:
        {userData?.newsletter ? " Sí" : " No"}
      </p>
      {!edit ? (
        <button onClick={() => setEdit(true)}>Editar</button>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            {items.items.map((item) => generateTag(item))}
            <button type="button" onClick={() => setEdit(false)}>
              Cancelar
            </button>
          </form>
          <button onClick={handleDeleteUser}>Eliminar Usuario</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
