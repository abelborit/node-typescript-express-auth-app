import nodemailer, { Transporter } from "nodemailer";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

/* este será mi servicio para mandar correos y también será nuestro patrón adaptador para centralizar el uso del paquete de terceros */
export class EmailService {
  /* este transporter es el objeto que termina mandando nuestro correo electrónico y para evitar dependencias ocultas como en el proyecto de -- node-NOC-app-monitoring-system -- entonces vamos a evitar la inicialización de nuestro transporter en este archivo */
  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerSecretKey: string,
    private readonly postEmailToProvider: boolean // nos indicará si vamos a llegar a enviar el correo o si no entonces mandaremos algo ficticio diciendo que se envió el correo para trabajar en desarrollo sin estar enviando correos de verdad y llenar la bandeja de entrada innecesariamente
  ) {
    /* aquí se hará la inicialización de nuestro transporter para poder recibir las variables necesarias mediante Inyección de Dependencias y que se inicialice el transporter a penas se cree el constructor de esta clase */
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    });
  }

  async sendEmail(sendEmailOptions: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = sendEmailOptions;

    try {
      /* para simular que se envió un correo electrónico para su validación (esto más que todo para trabajar en desarrollo) */
      if (!this.postEmailToProvider) return true;

      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInformation);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
