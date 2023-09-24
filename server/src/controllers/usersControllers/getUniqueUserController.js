const { getUniqueUserHelper } = require("../../helpers/usersHelpers/getUniqueUserHelper");
const moment = require("moment");

const getUniqueUserController = async (email) => {
  try {
    const user = await getUniqueUserHelper(email);
    if (user) {
      if (user.dateStart !== null) {
        user.dateStart = moment(user.dateStart).format("YYYY-MM-DD");
      }
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUniqueUserController };
