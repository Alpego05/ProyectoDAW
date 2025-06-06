const nodemailer = require("nodemailer");
require("dotenv").config();

// conf directa
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendWelcomeEmail = async (user, tempPassword) => {
  const mailOptions = {
    from: "medinettalavera@gmail.com",
    to: user.email,
    subject: "¡Bienvenido a Medinet! - Tu cuenta está lista",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background-color: #0077b6; padding: 30px 25px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">
            ¡Bienvenido a Medinet!
          </h1>
          <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 16px;">
            Su portal de salud digital
          </p>
        </div>

        <!-- Main Content -->
        <div style="background: #ffffff; padding: 30px 25px;">
          <div style="text-align: left; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin: 0; font-size: 22px; font-weight: 600;">
              Estimado/a <strong style="color: #0077b6;">${user.nombre} ${user.apellido1}</strong>
            </h2>
          </div>

          <p style="font-size: 16px; color: #475569; margin-bottom: 25px; line-height: 1.6;">
            Le informamos que su cuenta en Medinet ha sido creada exitosamente. A continuación, encontrará la información necesaria para acceder a nuestro sistema.
          </p>

          <!-- Datos de acceso -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0;">
            <h3 style="color: #1e293b; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
              Datos para iniciar sesión
            </h3>

            <div style="background: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500;">Usuario (DNI)</p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #1e293b; font-weight: 600;">${user.dni}</p>
            </div>

            <div style="background: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500;">Contraseña temporal</p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #dc2626; font-weight: 600; background: #fef2f2; padding: 8px 12px; border-radius: 4px; display: inline-block;">${tempPassword}</p>
            </div>
          </div>

          <!-- Alerta de seguridad -->
          <div style="background-color: #fff7ed; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="margin: 0; font-size: 15px; color: #92400e; font-weight: 600;">Importante para su seguridad</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #9a3412;">
              Por motivos de seguridad, le recomendamos cambiar esta contraseña temporal por una personalizada la primera vez que inicie sesión.
            </p>
          </div>

          <!-- Botón -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173/SetPass" 
               style="background-color: #0077b6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
              Configurar mi contraseña
            </a>
          </div>

          <!-- Instrucciones -->
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 15px 0; border: 1px solid #e2e8f0;">
            <h4 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
              Proceso para iniciar sesión
            </h4>
            <ol style="padding-left: 20px; margin: 0; color: #475569; font-size: 14px;">
              <li style="margin-bottom: 8px;">Ingrese su <strong>DNI</strong> como nombre de usuario</li>
              <li style="margin-bottom: 8px;">Utilice la <strong>contraseña temporal</strong> proporcionada en este correo</li>
              <li>Establezca una nueva contraseña personal siguiendo nuestras recomendaciones de seguridad</li>
            </ol>
          </div>
          
          <!-- Footer -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">Si tiene alguna duda, puede contactar con nuestro soporte técnico.</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Medinet - Todos los derechos reservados</p>
          </div>
        </div>
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