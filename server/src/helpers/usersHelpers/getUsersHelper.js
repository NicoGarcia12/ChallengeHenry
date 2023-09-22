const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsersHelper = async () => {
  try {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return users;
  } catch (error) {
    await prisma.$disconnect();
  }
};

module.exports = { getUsersHelper };
