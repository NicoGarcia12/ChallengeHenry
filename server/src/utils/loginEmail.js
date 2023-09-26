const { createTransport } = require("nodemailer");
const fs = require("fs");

require("dotenv").config();

let credencial = createTransport({
  host: process.env.SMTP,
  port: process.env.PORT_MAIL,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const fileForSend = fs.readFileSync(__dirname + "/loginUser.html", "utf-8");

async function loginEmail(user) {
  switch (user.preferredLanguage) {
    case "english":
      user.preferredLanguage = "Inglés";
      break;
    case "spanish":
      user.preferredLanguage = "Español";
      break;
    case "french":
      user.preferredLanguage = "Francés";
      break;
    default:
      user.preferredLanguage = "Alemán";
      break;
  }

  switch (user.howFound) {
    case "friends":
      user.howFound = "Amigos";
      break;
    case "online_search":
      user.howFound = "Búsqueda en línea";
      break;
    default:
      user.howFound = "Publicidad";
      break;
  }

  if (user.startDate === "") {
    user.startDate = "No especificado";
  }

  if (user.newsletterSubscription) {
    user.newsletterSubscription = "Si";
  } else {
    user.newsletterSubscription = "No";
  }

  const generateEmail = fileForSend
    .replace("${userName}", user.fullName)
    .replace("${userName}", user.fullName)
    .replace("${userNumber}", user.phoneNumber)
    .replace("${userStartDate}", user.startDate)
    .replace("${userPreferredLanguage}", user.preferredLanguage)
    .replace("${userHowFound}", user.howFound)
    .replace("${userNewsLetter}", user.newsletterSubscription);

  await credencial.sendMail({
    from: "<no-reply@challenge-henry.com>",
    to: `${user.userEmail}`,
    subject: "Login in Henry Challenge",
    html: generateEmail,
  });
}

module.exports = { loginEmail };
