const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUserHelper = async (dataUser) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          email: dataUser.userEmail,
          name: dataUser.fullName,
          phone: dataUser.phoneNumber,
          language: dataUser.preferredLanguage,
          findUs: dataUser.howFound,
          newsletter: dataUser.newsletterSubscription,
        },
      });
      await prisma.$disconnect();
      return newUser;
    } catch (error) {
      await prisma.$disconnect();
      throw new Error("Error al crear el usuario");
    }
  };
  
  module.exports = { createUserHelper };