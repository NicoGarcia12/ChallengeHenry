const {
  getUsersController,
} = require("../../controllers/usersControllers/getUsersController");
const getUsersHandler = async (req, res) => {
  try {
    const response = await getUsersController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsersHandler,
};
