const {
    updateUserController,
  } = require("../../controllers/usersControllers/updateUserController"); // Nuevo controlador para la actualización
  
  const updateUserHandler = async (req, res) => {
    try {
      const { email } = req.params;
      const {
        full_name,
        phone_number,
        preferred_language,
        how_found,
        newsletter_subscription,
      } = req.body;
  
      const dataUser = {
        email,
        full_name,
        phone_number,
        preferred_language,
        how_found,
        newsletter_subscription,
      };
  
      const response = await updateUserController(dataUser);
  
      return res.status(200).json({ user: response.updatedUser, message: response.message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    updateUserHandler,
  };
  