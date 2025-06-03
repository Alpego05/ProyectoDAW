const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuración directa de nodemailer (solo para pruebas)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},
  tls: {
    rejectUnauthorized: false,
  },
});

const sendWelcomeEmail = async (user) => {
  const mailOptions = {
    from: "medinettalavera@gmail.com",
    to: user.email,
    subject: "¡Bienvenido a Medinet!",
     html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
         
        </div>
        <h2 style="color: #3b82f6; text-align: center;">¡Bienvenido a Medinet!</h2>
        <p style="font-size: 16px; color: #333;">Estimado/a <strong>${user.nombre} ${user.apellido1}</strong>,</p>
        <p style="font-size: 16px; color: #333;">Tu cuenta ha sido creada exitosamente en nuestro sistema.</p>
        <p style="font-size: 16px; color: #333;">Para establecer tu contraseña ingresa en el siguiente <a href="http://localhost:5173/SetPass"> enlace </a></p>
        <p style="font-size: 16px; color: #333;">Si no solicitaste esta cuenta, por favor ignora este correo.</p>
        <p style="font-size: 16px; color: #333;">Saludos cordiales,<br><strong>El equipo del Sistema de Salud</strong></p>
         <img src="https://i.imgur.com/1mp5Tc5.jpeg" alt="Logo Medinet" style="width: 600px; border-radius: 8px;" />
      </div>
      
    `,
  };

  try {
    await transporter.verify();
    console.log("Conexión SMTP verificada");

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado a:", user.email);
    return true;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error(`Error al enviar correo de bienvenida: ${error.message}`);
  }
};

module.exports = {
  sendWelcomeEmail,
};
