const {
    updateUserController,
  } = require("../../controllers/usersControllers/updateUserController");
  const moment = require("moment");
  
  const updateUserHandler = async (req, res) => {
    try {
      const { email } = req.params;
      const {
        full_name,
        phone_number,
        start_date,
        preferred_language,
        how_found,
        newsletter_subscription,
      } = req.body;
      const dataUser = {
        userEmail: email,
        fullName: full_name,
        phoneNumber: phone_number,
        startDate:start_date,
        preferredLanguage: preferred_language,
        howFound: how_found,
        newsletterSubscription: newsletter_subscription,
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
  