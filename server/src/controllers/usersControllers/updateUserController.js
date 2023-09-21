const {
    updateUserHelper,
  } = require("../../helpers/usersHelpers/updateUserHelper"); // Nuevo helper para la actualización
  
  const updateUserController = async (dataUser) => {
    const updatedUser = await updateUserHelper(dataUser);
    return { updatedUser, message: "¡Usuario actualizado con éxito!" };
  };
  
  module.exports = {
    updateUserController,
  };
  