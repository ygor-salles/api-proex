import { getCustomRepository } from 'typeorm';
// eslint-disable-next-line import/order
import { UserRepository } from '../repositories/UserRepository';
import { hashSync } from 'bcryptjs';
import 'dotenv/config';
import { resolve } from 'path';
import handelbars from 'handlebars';
import fs from 'fs';
import httpStatus from 'http-status';
import transport from '../utils/Mailer';

class ForgotService {
  async execute(email: string) {
    const connectUser = getCustomRepository(UserRepository);

    const user = await connectUser.findOne({ email });
    if (!user) {
      return { status: httpStatus.NOT_FOUND, message: 'E-mail de usuário inexistente no sistema!' };
    }

    const passwordRand = Math.random().toString(36).slice(-8);

    user.password = hashSync(passwordRand, 8);

    const updatePassword = await connectUser.save(user);
    if (updatePassword) {
      const sendEmail = await this.sendMailForgotPassword(user.email, user.name, passwordRand);
      if (sendEmail) {
        return {
          status: httpStatus.OK,
          message: 'Senha atualizada com sucesso, verifique sua caixa de entrada',
        };
      }
      return {
        status: httpStatus.BAD_REQUEST,
        message: 'Senha atualizada, mas falha no envio de e-mail',
      };
    }
    return { status: httpStatus.BAD_REQUEST, message: 'Erro ao resetar senha' };
  }

  async sendMailForgotPassword(email: string, name: string, password: string): Promise<any> {
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'resetPassword.hbs');
    const templateFileContent = fs.readFileSync(npsPath).toString('utf-8');
    const mailTemplateParse = handelbars.compile(templateFileContent);
    const context = {
      display: 'block',
      host: process.env.CLIENT_HOST,
      name,
      title: 'Reset de senha!',
      description: `Senha alterada com sucesso! Seu código de verificação é: ${password}, caso queira atualizar sua senha clique no botão abaixo.`,
    };
    const html = mailTemplateParse(context);

    const sendMail = await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Reset de senha ✔',
      text: 'Reset de senha!',
      html,
    });
    return sendMail;
  }
}

export { ForgotService };
