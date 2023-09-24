import React, { useState } from "react";
import styles from "./Home.module.css";
import items from "../../utils/items.json";
import validation from "../../utils/validation";
import axios from "axios";
import { url } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = url;

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    phone_number: "",
    start_date: "",
    preferred_language: "english",
    how_found: "",
    newsletter_subscription: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Si es un checkbox, actualiza el estado con el valor 'checked'
    const newValue = type === "checkbox" ? checked : value;

    setNewUser({
      ...newUser,
      [name]: newValue,
    });

    setErrors(
      validation({
        ...newUser,
        [name]: newValue,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errores = Object.values(errors);
    if (errores && errores.length > 0) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      // Utiliza la acción de Redux para enviar el usuario
      dispatch(createUser(newUser))
        .then((response) => {
          alert(response.message);
          navigate(`/userprofile/${newUser.email}`);
        })
        .catch((error) => {
          alert("Hubo un error al crear el usuario, vuelva a intentar");
        });
    }
  };

  // Para no mezclar mucho código JavaScript con el HTML hago una función por fuera del return que va a recibir el item, verificar que type es y a partir de eso generar lo que se tenga que generar
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
                  value={newUser[item.name]}
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
                      checked={newUser[item.name] === option.value}
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
                  checked={newUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                />
              ) : item.type === "tel" ? (
                <input
                  type="number"
                  name={item.name}
                  value={newUser[item.name]}
                  onChange={handleInputChange}
                  required={item.required}
                  className={styles.input}
                />
              ) : (
                <input
                type={item.type}
                name={item.name}
                value={newUser[item.name]}
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

  return (
    <div className={styles.Home}>
      <h1>Formulario de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr key="email">
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required={true}
                  className={styles.input}
                />
                {errors.email && <span>{errors.email}</span>}
              </td>
            </tr>
            {items.items.map((item) => generateTag(item))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;
