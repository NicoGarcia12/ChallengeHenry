const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUniqueUserHelper = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getUniqueUserHelper };
