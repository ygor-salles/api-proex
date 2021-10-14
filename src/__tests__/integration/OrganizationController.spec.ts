/* eslint-disable no-undef */
import httpStatus from 'http-status';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';

const createOrganization = {
  name: 'Organização Tal',
  cep: '37510-000',
  state: 'Minas Gerais',
  district: 'District 1',
  city: 'São José do Alegre',
  street: 'Rua Tal',
  number: 125,
  description: 'Descrição Tal',
};

describe('Organizations', () => {
  beforeAll(async () => {
    const connection = await createConnetion();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new organization', async () => {
    const response = await request(app).post('/organizations').send(createOrganization);

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
    const response = await request(app).post('/organizations').send(createOrganization);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Organização já existe');
  });
});
