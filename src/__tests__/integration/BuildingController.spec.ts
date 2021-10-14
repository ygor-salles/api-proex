/* eslint-disable no-undef */
import httpStatus from 'http-status';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';

const createBuilding = {
  name: 'Prédio 1',
  latitude: -25.3347773,
  longitude: -47.5304414,
  description: 'Descrição do prédio 1',
  // organization_id: '{{ _.organization_id }}',
};

const createOrganization = {
  id: '{{ _.organization_id }}',
  name: 'Organização Tal',
  cep: '37510-000',
  state: 'Minas Gerais',
  district: 'District 1',
  city: 'São José do Alegre',
  street: 'Rua Tal',
  number: 125,
  description: 'Descrição Tal',
};

const createUser = {
  name: 'User example',
  email: 'user@example.com',
  password: '123456',
  role: 'SUPER',
};

const loginUser = {
  email: createUser.email,
  password: createUser.password,
};

let token: string;
let organizationId: string;

describe('Organizations', () => {
  beforeAll(async () => {
    await createConnetion();
    await request(app).post('/users').send(createUser);
    const response = await request(app).post('/login').send(loginUser);
    token = response.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should be able to create a new organization', async () => {
    const response = await request(app)
      .post('/organizations')
      .set('Authorization', `bearer ${token}`)
      .send(createOrganization);

    organizationId = response.body.id;

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.name).toBe(createOrganization.name);
    expect(response.body.cep).toBe(createOrganization.cep);
    expect(response.body.state).toBe(createOrganization.state);
    expect(response.body.district).toBe(createOrganization.district);
    expect(response.body.city).toBe(createOrganization.city);
    expect(response.body.street).toBe(createOrganization.street);
    expect(response.body.number).toBe(createOrganization.number);
    expect(response.body.description).toBe(createOrganization.description);
  });

  it('Should not be able to create a organization with exists', async () => {
    const response = await request(app)
      .post('/organizations')
      .set('Authorization', `bearer ${token}`)
      .send(createOrganization);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Organização já existe');
  });

  it('Should be able to edit a existing organization', async () => {
    const editedOrganization = {
      name: 'Organização editada',
      cep: '37510-000',
      state: 'Minas Gerais',
      district: 'District 1',
      city: 'São José do Alegre',
      street: 'Rua Tal',
      number: 125,
      description: 'Descrição Tal',
    };

    const response = await request(app)
      .put(`/organizations/${organizationId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedOrganization);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Organização atualizada com sucesso!');
  });

  it('Should be able to get a organization by Id', async () => {
    const response = await request(app)
      .get(`/organizations/${organizationId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.name).toBe('Organização editada');
  });

  it('Should not be able to get a user by Id', async () => {
    const response = await request(app)
      .get(`/organizations/2`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe('Organização não existe!');
  });

  it('Should be able to get all organizations', async () => {
    const response = await request(app)
      .get('/organizations')
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body[0].name).toBe('Organização editada');
  });

  it('Should be able to delete a organization', async () => {
    const response = await request(app)
      .delete(`/organizations/${organizationId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Organização removida com sucesso!');
  });
});
