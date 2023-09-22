const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteUserHelper = async (email) => {
  try {
    await prisma.user.delete({
      where: { email: email },
    });

    await prisma.$disconnect();
    return;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Error al eliminar el usuario");
  }
};

module.exports = { deleteUserHelper };
