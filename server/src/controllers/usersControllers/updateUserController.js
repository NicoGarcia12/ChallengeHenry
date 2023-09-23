const {
    updateUserHelper,
  } = require("../../helpers/usersHelpers/updateUserHelper");
  const moment = require("moment")
  
  const updateUserController = async (dataUser) => {
    if (dataUser.startDate !== "") {
      console.log("1")
      dataUser = {
        ...dataUser,
        startDate: moment(dataUser.startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      };
    } else {
      console.log("2")
      dataUser = {
        ...dataUser,
        startDate: null,
      };
    } 
    const updatedUser = await updateUserHelper(dataUser);
    return { updatedUser, message: "¡Usuario actualizado con éxito!" };
  };
  
  module.exports = {
    updateUserController,
  };
  