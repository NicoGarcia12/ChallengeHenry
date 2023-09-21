const { getUsersHelper } = require("../../helpers/usersHelpers/getUsersHelper");

const getUsersController = async () => {
  const users = await getUsersHelper();
  return users;
};

module.exports = {
  getUsersController,
};
