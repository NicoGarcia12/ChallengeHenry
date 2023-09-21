const {
  getUniqueUserController,
} = require("../../controllers/usersControllers/getUniqueUserController");
const getUniqueUserHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await getUniqueUserController(email);
    return res.status(200).json(response);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

module.exports = { getUniqueUserHandler };
