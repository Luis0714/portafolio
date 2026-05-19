import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2e3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function buildEmailTemplate(name, email, message) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuevo mensaje de contacto</title>
      </head>
      <body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px;">
          <h1 style="font-size: 22px; margin-bottom: 20px;">Nuevo mensaje desde estremor.com</h1>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Correo:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${safeMessage}</p>
        </div>
      </body>
    </html>
  `;
}
const POST = async ({ request }) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Método no permitido" }, 405);
  }
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.website ?? "").trim();
    if (honeypot) {
      return jsonResponse({ ok: true }, 200);
    }
    if (!name || !email || !message) {
      return jsonResponse({ error: "Completa todos los campos obligatorios." }, 400);
    }
    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ error: "El mensaje es demasiado largo." }, 400);
    }
    if (!EMAIL_PATTERN.test(email)) {
      return jsonResponse({ error: "El correo electrónico no es válido." }, 400);
    }
    const apiKey = undefined                              ;
    const emailSender = undefined                            ;
    const emailReceiver = undefined                              ;
    if (!apiKey || !emailSender || !emailReceiver) {
      console.error("Faltan variables de entorno para el envío de correo.");
      return jsonResponse(
        { error: "El servicio de correo no está configurado. Intenta más tarde." },
        503
      );
    }
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: emailSender,
      to: [emailReceiver],
      replyTo: email,
      subject: `Contacto portafolio — ${name}`,
      html: buildEmailTemplate(name, email, message)
    });
    if (error) {
      console.error("Resend error:", error);
      return jsonResponse({ error: "No se pudo enviar el mensaje. Intenta de nuevo." }, 500);
    }
    return jsonResponse({ ok: true }, 200);
  } catch {
    return jsonResponse({ error: "Solicitud inválida." }, 400);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
