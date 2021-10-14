/* eslint-disable no-undef */
import httpStatus from 'http-status';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';

const createMap = {
  name: 'Mapa 1',
  source: 'url',
  description: 'Descrição Mapa 2',
  building_id: '',
};

const createBuilding = {
  name: 'Prédio 1',
  latitude: -25.3347773,
  longitude: -47.5304414,
  description: 'Descrição do prédio 1',
  organization_id: '',
};

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
let organization_id: string;
let building_id: string;
let map_id: string;

describe('Maps', () => {
  beforeAll(async () => {
    await createConnetion();
    // to create a new user
    await request(app).post('/users').send(createUser);
    const Login = await request(app).post('/login').send(loginUser);
    token = Login.body.token;

    const newOrganization = await request(app)
      .post('/organizations')
      .set('Authorization', `bearer ${token}`)
      .send(createOrganization);

    organization_id = newOrganization.body.id;
    createBuilding.organization_id = organization_id;
    const newBuilding = await request(app)
      .post('/buildings')
      .set('Authorization', `bearer ${token}`)
      .send(createBuilding);

    building_id = newBuilding.body.id;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should be able to create a new map', async () => {
    createMap.building_id = building_id;

    const response = await request(app)
      .post('/maps')
      .set('Authorization', `bearer ${token}`)
      .send(createMap);

    map_id = response.body.id;

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.name).toBe(createMap.name);
    expect(response.body.source).toBe(createMap.source);
    expect(response.body.description).toBe(createMap.description);
    expect(response.body.building_id).toBe(createMap.building_id);
  });

  it('Should not be able to create a map with exists', async () => {
    const response = await request(app)
      .post('/maps')
      .set('Authorization', `bearer ${token}`)
      .send(createMap);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Mapa já existe');
  });

  it('Should be able to edit a existing map', async () => {
    const editedMap = {
      name: 'Mapa 1 editado',
      source: 'url',
      description: 'Descrição Mapa 2',
      building_id,
    };

    const response = await request(app)
      .put(`/maps/${map_id}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedMap);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Mapa atualizado com sucesso!');
  });

  it('Should be able to get a map by Id', async () => {
    const response = await request(app)
      .get(`/maps/${map_id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.name).toBe('Mapa 1 editado');
  });

  it('Should not be able to get a map by Id', async () => {
    const response = await request(app).get(`/maps/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Id do mapa não encontrado');
  });

  it('Should be able to get all maps', async () => {
    const response = await request(app).get('/maps').set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body[0].name).toBe('Mapa 1 editado');
  });

  it('Should be able to delete a map', async () => {
    const response = await request(app)
      .delete(`/maps/${map_id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Mapa removido com sucesso!');
  });
});
