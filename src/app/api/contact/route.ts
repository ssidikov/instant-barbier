import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    // Configuration of Nodemailer transport using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g: "linstantbarbier@gmail.com" set in your .env.local
        pass: process.env.EMAIL_PASS, // an App Password generated from your Google Account settings
      },
    })

    // 1. Email sent to the Salon owners containing the Customer's query
    const mailToSalon = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Best practice to send from our own authenticated email to avoid spam blocks
      replyTo: email,
      to: process.env.EMAIL_USER, // Send it to the salon's own gmail inbox
      subject: `[Site Web] Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1a202c; max-width: 600px; padding: 20px;">
          <h2 style="color: #07181e; font-size: 24px;">Nouveau message de contact</h2>
          <p style="font-size: 16px;">Vous avez reçu une nouvelle demande d'information depuis le site web L'Instant Barbier :</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nom complet :</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Téléphone :</strong> ${phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          </div>

          <h3 style="color: #AF9778; font-size: 18px; margin-top: 30px;">Message du client :</h3>
          <div style="background-color: #ffffff; border-left: 4px solid #AF9778; padding: 15px; font-style: italic; color: #4a5568; line-height: 1.6;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    }

    // 2. Auto-responder email sent back to the Customer
    const mailToClient = {
      from: `"L'Instant Barbier" <${process.env.EMAIL_USER}>`,
      to: email, // Sending directly to the customer's email provided in the form
      subject: `Votre demande a bien été reçue - L'Instant Barbier`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 8px;">
          
          <h2 style="color: #AF9778; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin-bottom: 30px;">
            L'Instant Barbier
          </h2>

          <p style="font-size: 16px; line-height: 1.6;">Bonjour <strong>${name}</strong>,</p>
          
          <p style="font-size: 16px; line-height: 1.6;">Nous vous confirmons la bonne réception de votre message et vous en remercions.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">Notre équipe prendra connaissance de votre demande d'informations et nous vous recontacterons dans les plus brefs délais.</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          
          <p style="font-size: 14px; color: #718096; margin-bottom: 20px;">Pour rappel, voici votre message :</p>
          
          <blockquote style="border-left: 3px solid #AF9778; padding-left: 15px; margin: 0; color: #4a5568; font-style: italic; font-size: 15px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </blockquote>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          
          <p style="font-size: 16px; margin: 0;">À très bientôt,</p>
          <p style="font-size: 16px; font-weight: bold; color: #07181e; margin: 5px 0;">L'équipe de L'Instant Barbier</p>
          <p style="font-size: 14px; color: #718096; margin: 0;">43 rue de Turenne, 75003 Paris<br/>Tél: 01 45 35 47 22</p>

        </div>
      `,
    }

    // Send both emails simultaneously
    await Promise.all([transporter.sendMail(mailToSalon), transporter.sendMail(mailToClient)])

    return NextResponse.json(
      { message: 'Vos emails ont été envoyés avec succès.' },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur Nodemailer lors de l'envoi de l'email:", error)
    return NextResponse.json(
      { error: "Une erreur critique s'est produite lors de l'envoi du message." },
      { status: 500 },
    )
  }
}
