import sendgrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(req) {
  try {
    let {
      fullnamePatient,
      fullnameDoctor,
      serviceName,
      date,
      localityAddress,
      email_to,
    } = await req.json();
    let resSendgrid = await sendgrid.send({
      to: email_to,
      from: "noodus.medhaus@xentraly.com",
      subject: `Se ha confirmado tu cita - Prosit`,
      html: `<div>
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4% 12%;
          background-color: #216AD9;
        ">
        <img src="https://hqdiyiqhqbknumobtkox.supabase.co/storage/v1/object/public/emails/prosit-blanco1.webp" width="300px" />

        </div>
        <div style="
            padding: 4% 12%;
            position: relative;
            display: block;
            color: #1C2C51;
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
        ">
            <p>Estimado ${fullnamePatient}</p>
            <p>Enhorabuena tu cita de ${serviceName} con ${fullnameDoctor} esta confirmada.</p>
            <p>
              Fecha: ${date}<br/>
              Hora: ${date}<br/>
              Dirección: ${localityAddress}
            </p>
            <br/>
            <p>Atentamente, el equipo de Prosit.</p>
        </div>
      </div>`,
    });
    return NextResponse.json({ message: resSendgrid }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
