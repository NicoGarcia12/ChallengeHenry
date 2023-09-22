const { Router } = require("express");
const mainRouter = Router();
const {
  createUserHandler,
} = require("../handlers/usersHandlers/createUserHandler");
const {
  getUniqueUserHandler,
} = require("../handlers/usersHandlers/getUniqueUserHandler");
const {
  getUsersHandler,
} = require("../handlers/usersHandlers/getUsersHandler");
const {
  updateUserHandler,
} = require("../handlers/usersHandlers/updateUserHandler");
const {
  deleteUserHandler,
} = require("../handlers/usersHandlers/deleteUserHandler");

mainRouter.post("/user", createUserHandler);
mainRouter.get("/user/:email", getUniqueUserHandler);
mainRouter.get("/users", getUsersHandler);
mainRouter.put("/user/:email", updateUserHandler); // FALTA LA FECHA
mainRouter.delete("/user/:email", deleteUserHandler);

module.exports = mainRouter;
