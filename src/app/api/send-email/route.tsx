import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { ContactFormData } from "@/typing";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { email, name, message } = await req.json();

    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!contactEmail) {
      return NextResponse.json(
        { error: "No contact email provided" },
        { status: 500 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: `Namenlos <${fromEmail}>`,
      to: [contactEmail],
      subject: "Nouvelle prise de contact sur Namenlos",
      text: "",
      react: EmailTemplate({ email, name, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }
}

const EmailTemplate = ({ name, email, message }: ContactFormData) => (
  <div>
    <h3>
      Vous avez un nouveau message provenant du formulaire de contact du site
      Namenlos
    </h3>
    <p>{`Nom: ${name}`}</p>
    <p>{`Email: ${email}`}</p>
    <p dangerouslySetInnerHTML={{ __html: message }} />
  </div>
);
