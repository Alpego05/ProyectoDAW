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

const sendWelcomeEmail = async (user, tempPassword) => {
  const mailOptions = {
    from: "medinettalavera@gmail.com",
    to: user.email,
    subject: " ¡Bienvenido a Medinet! - Tu cuenta está lista",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
  <!-- Header -->
  <div style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 40px 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 36px; font-weight: 800; letter-spacing: -1px; background: #0077b6; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      ¡Bienvenido a Medinet! 
    </h1>
    <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #0077b6, #8b5cf6); margin: 20px auto; border-radius: 2px;"></div>
  </div>

  <!-- Main Content -->
  <div style="background: #ffffff; padding: 20px 15px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">
        Hola <strong style="color: #0077b6;">${user.nombre} ${user.apellido1}</strong>
      </h2>
    </div>

    <p style="font-size: 18px; color: #4b5563; text-align: center; margin-bottom: 30px; line-height: 1.6;">
      🎉 ¡Tu cuenta ha sido creada exitosamente! Ya formas parte de nuestra comunidad médica digital.
    </p>

    <!-- Datos de acceso -->
    <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 30px; border-radius: 16px; border: 2px solid #e5e7eb; margin: 30px 0;">
      <h3 style="color: #1f2937; font-size: 20px; font-weight: 700; margin-bottom: 20px;">
        🔐 Datos para iniciar sesión
      </h3>

      <div style="background: #ffffff; padding: 20px; border-radius: 12px; margin: 15px 0; border: 1px solid #d1d5db; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: 500;">Usuario (DNI)</p>
        <p style="margin: 5px 0 0 0; font-size: 18px; color: #1f2937; font-weight: 700; font-family: monospace;">${user.dni}</p>
      </div>

      <div style="background: #ffffff; padding: 20px; border-radius: 12px; margin: 15px 0; border: 1px solid #d1d5db; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; align-items: center;">
        <span style="font-size: 24px; margin-right: 15px;">🔑</span>
        <div>
          <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: 500;">Contraseña temporal</p>
          <p style="margin: 5px 0 0 0; font-size: 20px; color: #dc2626; font-weight: 800; font-family: monospace; background: #fef2f2; padding: 8px 12px; border-radius: 8px; display: inline-block;">${tempPassword}</p>
        </div>
      </div>
    </div>

    <!-- Alerta de seguridad -->
    <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 20px; border-radius: 12px; border-left: 5px solid #f59e0b; margin: 25px 0;">
      <div style="display: flex; align-items: center;">
        <span style="font-size: 28px; margin-right: 15px;">⚠️</span>
        <div>
          <p style="margin: 0; font-size: 16px; color: #92400e; font-weight: 600;">¡Importante para tu seguridad!</p>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #a16207;">
            Cambia esta contraseña temporal por una personalizada la primera vez que inicies sesión.
          </p>
        </div>
      </div>
    </div>

    <!-- Botón -->
    <div style="text-align: center; margin: 20px 0;">
      <a href="http://localhost:5173/SetPass" 
         style="background: #0077b6; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3); transition: transform 0.2s;">
        Configurar mi contraseña
      </a>
    </div>

    <!-- Instrucciones -->
    <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 15px 0; border: 1px solid #e2e8f0;">
      <h4 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
        ¿Cómo iniciar sesión?
      </h4>
      <ul style="padding-left: 20px; margin: 0; color: #4b5563; font-size: 15px;">
        <li style="margin-bottom: 10px;">1. Necesitas tu <strong>DNI</strong> para inciar sesión</li>
        <li style="margin-bottom: 10px;">2. Ingresa tu <strong>contraseña temporal</strong>.</li>
        <li>3. Establece tu nueva contraseña personal.</li>
      </ul>
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