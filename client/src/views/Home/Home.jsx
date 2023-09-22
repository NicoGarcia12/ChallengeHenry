import React, { useState } from "react";
import "./Home.module.css";
import items from "../../utils/items.json";
import validation from "../../utils/validation";
import axios from "axios";
import { url } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
axios.defaults.baseURL = url;

function Home() {
  const dispatch = useDispatch();
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
          // Restablece el estado del formulario a sus valores iniciales
          setNewUser({
            email: "",
            full_name: "",
            phone_number: "",
            start_date: "",
            preferred_language: "english",
            how_found: "",
            newsletter_subscription: false,
          });
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
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <input
              type={item.type}
              name={item.name}
              value={newUser[item.name]}
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
              value={newUser[item.name]}
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
              value={newUser[item.name]}
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
                  checked={newUser[item.name] === option.value}
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
              checked={newUser[item.name]}
              onChange={handleInputChange}
              required={item.required}
            />
            <label>{item.label}</label>
          </div>
        );

      case "submit":
        return (
          <button type="submit" key={item.name}>
            {item.label}
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="Home">
      <form onSubmit={handleSubmit}>
        <div key="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required={true}
          />
          <br />
          {errors.email && <span>{errors.email}</span>}
        </div>
        {items.items.map((item) => generateTag(item))}
      </form>
    </div>
  );
}

export default Home;
