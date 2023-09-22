export default function validation(data) {
  let errors = {};

  function isValidEmail(email) {
    // Utilizo una expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function laterDate(dateString) {
    // Convierte la cadena de fecha en un objeto Date
    const selectedDate = new Date(dateString);
    // Obtiene la fecha actual
    const currentDate = new Date();
    // Compara las fechas
    return selectedDate > currentDate;
  }

  if (!data.email) {
    errors.email = "Debe colocar su email";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Debe ingresar un email válido";
  }

  if (!data.full_name) {
    errors.full_name = "Debe colocar su nombre";
  }

  if (!data.phone_number || isNaN(data.phone_number)) {
    errors.phone_number = "Debe colocar un número de teléfono";
  }

  if (data.start_date !== "" && laterDate(data.start_date)) {
    errors.start_date = "La fecha no puede ser posterior a hoy";
  }

  if (
    !data.preferred_language ||
    !["english", "spanish", "german", "french"].includes(
      data.preferred_language
    )
  ) {
    errors.preferred_language = "Seleccione un idioma válido";
  }

  if (
    !data.how_found ||
    !["friends", "online_search", "advertisement"].includes(data.how_found)
  ) {
    errors.how_found = "Seleccione una opción válida";
  }

  return errors;
}
