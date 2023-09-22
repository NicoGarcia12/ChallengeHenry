const {
  deleteUserController,
} = require("../../controllers/usersControllers/deleteUserController");

const deleteUserHandler = async (req, res) => {
  try {
    const { email } = req.params;

    const response = await deleteUserController(email);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  deleteUserHandler,
};
