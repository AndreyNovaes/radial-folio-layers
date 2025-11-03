import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  try {
    const result = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'andreynovaespro@gmail.com',
      subject: `Nova mensagem de ${name} via Portfólio`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
            .header { border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
            .header h2 { color: #333; margin: 0; }
            .content { color: #555; line-height: 1.6; }
            .info { background-color: #f9f9f9; padding: 12px; border-left: 4px solid #007bff; margin: 15px 0; }
            .info strong { color: #333; }
            .footer { border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 Nova Mensagem de Contato</h2>
            </div>

            <div class="content">
              <p>Olá,</p>
              <p>Você recebeu uma nova mensagem através do formulário de contato do seu portfólio.</p>

              <div class="info">
                <strong>👤 Nome:</strong><br>
                ${name}
              </div>

              <div class="info">
                <strong>✉️ Email:</strong><br>
                <a href="mailto:${email}">${email}</a>
              </div>

              <div class="info">
                <strong>💬 Mensagem:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>

              <p style="margin-top: 20px;"><strong>Responda direto para este email para entrar em contato com o visitante.</strong></p>
            </div>

            <div class="footer">
              <p>Este email foi enviado automaticamente por seu portfólio.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (result.error) {
      console.error('Erro ao enviar email:', result.error);
      return res.status(400).json({ error: 'Erro ao enviar email. Tente novamente.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      id: result.data?.id,
    });
  } catch (error) {
    console.error('Erro interno:', error);
    return res.status(500).json({ error: 'Erro interno do servidor. Tente novamente.' });
  }
}
