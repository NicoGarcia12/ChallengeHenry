const {
  deleteUserHelper,
} = require("../../helpers/usersHelpers/deleteUserHelper");

const deleteUserController = async (email) => {
  await deleteUserHelper(email);
  return "¡Usuario eliminado con éxito!";
};

module.exports = {
    deleteUserController,
};
