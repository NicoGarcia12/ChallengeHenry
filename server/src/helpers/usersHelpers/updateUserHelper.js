const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateUserHelper = async (dataUser) => {
  try {
    console.log(dataUser)
    const updatedUser = await prisma.user.update({
      where: { email: dataUser.userEmail },
      data: {
        name: dataUser.fullName,
        phone: dataUser.phoneNumber,
        dateStart: dataUser.startDate,
        language: dataUser.preferredLanguage,
        findUs: dataUser.howFound,
        newsletter: dataUser.newsletterSubscription,
      },
    });
    await prisma.$disconnect();
    return updatedUser;
  } catch (error) {
    await prisma.$disconnect();
  }
};

module.exports = { updateUserHelper };
