import 'dotenv/config';
import { resolve } from 'path';
import handelbars from 'handlebars';
import fs from 'fs';
import { UserService } from './UserService';
import transport from '../utils/Mailer';

class ChangeService {
  async execute(email: string, password: string, codVerificacao: string) {
    const userService = new UserService();

    await userService.updateChangePassword(email, password, codVerificacao);
    this.sendMailChangePassword(email);
  }

  async sendMailChangePassword(email: string) {
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'resetPassword.hbs');
    const templateFileContent = fs.readFileSync(npsPath).toString('utf-8');
    const mailTemplateParse = handelbars.compile(templateFileContent);
    const context = {
      display: 'none',
      host: '#',
      title: 'Senha alterada com sucesso!',
      description: 'Senha alterada com sucesso!',
      nameUser: '',
    };
    const html = mailTemplateParse(context);

    const sendMail = await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Alteração de senha ✔',
      text: 'Alteração de senha!',
      html,
    });
    return sendMail;
  }
}

export { ChangeService };
