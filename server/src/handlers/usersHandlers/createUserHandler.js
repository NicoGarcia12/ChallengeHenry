const {
  createUserController,
} = require("../../controllers/usersControllers/createUserController");

const createUserHandler = async (req, res) => {
  try {
    const {
      email,
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
    const response = await createUserController(dataUser);

    return res
      .status(200)
      .json({ user: response.newUser, message: response.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
};
