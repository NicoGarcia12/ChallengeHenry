const {
  createUserHelper,
} = require("../../helpers/usersHelpers/createUserHelper");

const createUserController = async (dataUser) => {
  const newUser = await createUserHelper(dataUser);
  return { newUser, message: "¡Éxito al cargar el usuario!" };
};

module.exports = {
  createUserController,
};
