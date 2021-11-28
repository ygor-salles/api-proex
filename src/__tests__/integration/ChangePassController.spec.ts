import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { app } from '../../app';
import createConnection from '../../database';
import { UserRepository } from '../../repositories/UserRepository';

// email cadastrado no seeder
const emailExists = 'user2@gmail.com';

// email inexistente
const emailInexists = 'userInexist@gmail.com';

describe('Auth', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // caso de sucesso
  it('Should return 201 as password has been reset', async () => {
    // como o código de verificação representa a senha atual no banco, no qual é enviada para o e-mail.
    // Foi pego a senha do usuário 2 cadastrado no seeder e feito o reset para a senha 1234567
    const response = await request(app)
      .post('/change-password')
      .send({
        email: emailExists,
        password: '1234567',
        codVerificacao: '123456',
      })
      .timeout(6000);

    const repository = getCustomRepository(UserRepository);
    const userFound = await repository.findOne({ email: emailExists });

    const compareHash = await bcrypt.compare('1234567', userFound.password);

    expect(compareHash).toBe(true);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Senha recuperada com sucesso!');
  });

  // Casos de inssucesso
  it('Should return 404 because email does not exists', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailInexists,
      password: '1234567',
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado!');
  });

  it('Should return 400 because the email was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      password: '1234567',
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail é obrigatório');
  });

  it('Should return 400 because the password was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailExists,
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Senha é obrigatória');
  });

  it('Should return 400 because the codVerificacao was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailExists,
      password: '1234567',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Código de verificação é obrigatório');
  });
});
