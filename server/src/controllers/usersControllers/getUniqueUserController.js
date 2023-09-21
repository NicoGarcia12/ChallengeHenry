const { getUniqueUserHelper } = require("../../helpers/usersHelpers/getUniqueUserHelper");
const getUniqueUserController = async (email) => {
  try {
    const user = await getUniqueUserHelper(email);
    if (user) {
      return user
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUniqueUserController };