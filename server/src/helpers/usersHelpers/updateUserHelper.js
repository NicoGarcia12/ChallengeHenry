const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateUserHelper = async (dataUser) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: dataUser.email },
      data: {
        name: dataUser.full_name,
        phone: dataUser.phone_number,
        language: dataUser.preferred_language,
        findUs: dataUser.how_found,
        newsletter: dataUser.newsletter_subscription,
      },
    });

    await prisma.$disconnect();
    return updatedUser;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Error al actualizar el usuario");
  }
};

module.exports = { updateUserHelper };
