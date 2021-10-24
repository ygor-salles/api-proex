/* eslint-disable no-undef */
import httpStatus from 'http-status';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';

const createPoint = {
  name: 'ponto 1',
  description: 'descrição ponto 1',
  floor: 2,
  altitude: 130.123,
  latitude: -25.3347773,
  longitude: -47.5304414,
  isObstacle: true,
  map_id: '',
};

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
let point_id: string;

describe('Points', () => {
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
    createMap.building_id = building_id;

    const newMap = await request(app)
      .post('/maps')
      .set('Authorization', `bearer ${token}`)
      .send(createMap);

    map_id = newMap.body.id;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should be able to create a new point', async () => {
    createPoint.map_id = map_id;

    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send(createPoint);

    point_id = response.body.id;

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.name).toBe(createPoint.name);
    expect(response.body.description).toBe(createPoint.description);
    expect(response.body.floor).toBe(createPoint.floor);
    expect(response.body.altitude).toBe(createPoint.altitude);
    expect(response.body.latitude).toBe(createPoint.latitude);
    expect(response.body.longitude).toBe(createPoint.longitude);
    expect(response.body.isObstacle).toBe(createPoint.isObstacle);
    expect(response.body.map_id).toBe(createPoint.map_id);
  });

  it('Should not be able to create a point with exists', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send(createPoint);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Ponto já existe');
  });

  it('Should be able to edit a existing point', async () => {
    const editedPoint = {
      name: 'ponto 1 editado',
      description: 'descrição ponto 1',
      floor: 2,
      altitude: 130.123,
      latitude: -25.3347773,
      longitude: -47.5304414,
      isObstacle: true,
      map_id,
    };

    const response = await request(app)
      .put(`/points/${point_id}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedPoint);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Ponto atualizado com sucesso!');
  });

  it('Should be able to get a point by Id', async () => {
    const response = await request(app)
      .get(`/points/${point_id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.name).toBe('ponto 1 editado');
  });

  it('Should not be able to get a point by Id', async () => {
    const response = await request(app).get(`/points/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Id do ponto não encontrado');
  });

  it('Should be able to get all points', async () => {
    const response = await request(app).get('/points').set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body[0].name).toBe('ponto 1 editado');
  });

  it('Should be able to delete a point', async () => {
    const response = await request(app)
      .delete(`/points/${point_id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Ponto removido com sucesso!');
  });
});
