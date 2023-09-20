import React from "react";
import "./App.css";
import items from "./utils/items.json";

function App() {
  // Para no mezclar mucho código JavaScript con el HTML hago una función por fuera del return que va a recibir el item, verificar que type es y a partir de eso generar lo que se tenga que generar
  const generateTag = (item) => {
    switch (item.type) {
      case "text":
      case "tel":
      case "date":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <input type={item.type} name={item.name} required={item.required} />
          </div>
        );

      case "select":
        return (
          <div key={item.name}>
            <label>{item.label}</label>
            <select name={item.name} required={item.required}>
              {item.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
                  required={item.required}
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div key={item.name}>
            <input type="checkbox" name={item.name} required={item.required} />
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
    <div className="App">
      <form>
        <div key="email">
          <label>Email:</label>
          <input type="email" name="email" required="true" />
        </div>
        {items.items.map((item) => generateTag(item))}
      </form>
    </div>
  );
}

export default App;
