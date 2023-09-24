const { getUsersHelper } = require("../../helpers/usersHelpers/getUsersHelper");
const moment = require("moment");

const getUsersController = async () => {
  const users = await getUsersHelper();
  const formattedUsers = users.map((user) => {
    if (user.dateStart !== null) {
      return {
        ...user,
        dateStart: moment(user.dateStart).format("YYYY-MM-DD"),
      };
    } else {
      return user;
    }
  });

  return formattedUsers;
};
module.exports = {
  getUsersController,
};
