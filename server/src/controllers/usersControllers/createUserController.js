const {
  createUserHelper,
} = require("../../helpers/usersHelpers/createUserHelper");
const moment = require("moment");

const createUserController = async (dataUser) => {
  // Formatea la fecha en el formato correcto
  if (dataUser.startDate !== "") {
    dataUser = {
      ...dataUser,
      startDate: moment(dataUser.startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    };
  } else {
    dataUser = {
      ...dataUser,
      startDate: null,
    };
  } 
  const newUser = await createUserHelper(dataUser);
  return { newUser, message: "¡Éxito al cargar el usuario!" };
};

module.exports = {
  createUserController,
};
