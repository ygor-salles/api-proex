/* eslint-disable no-undef */
import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';
import { BuildingRepository } from '../../repositories/BuildingRepository';

// ids de organizações cadastradas no seeders
const organizationId1 = 'ad8fb4ff-a518-42c0-af78-ac5062eaf53d';
const organizationId2 = '45659fc4-1946-4080-adba-d084543c3324';

const createBuilding = {
  name: 'Prédio Test',
  latitude: -25.3347773,
  longitude: -47.5304414,
  description: 'Descrição do prédio Test',
  organization_id: organizationId1,
};

const editedBuilding = {
  name: 'Prédio Test editado',
  latitude: -26.3347773,
  longitude: -48.5304414,
  description: 'Descrição do prédio Test editado',
  organization_id: organizationId2,
};

// usuário criado na execução dos seeders
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

let token: string;
let buildingId: string;

describe('Buildings', () => {
  beforeAll(async () => {
    await createConnetion();
    const Login = await request(app).post('/login').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // testes para criação de prédios
  it('Should be able to create a new building and return 201', async () => {
    const response = await request(app)
      .post('/buildings')
      .set('Authorization', `bearer ${token}`)
      .send(createBuilding);

    buildingId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createBuilding.name);
    expect(response.body.latitude).toBe(createBuilding.latitude);
    expect(response.body.longitude).toBe(createBuilding.longitude);
    expect(response.body.organization_id).toBe(createBuilding.organization_id);
  });

  it('Should not be able to create a building with exists and return 400', async () => {
    const response = await request(app)
      .post('/buildings')
      .set('Authorization', `bearer ${token}`)
      .send(createBuilding);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Prédio já existe');
  });

  // testes para edição de prédios
  it('Should be able to edit a existing building and return 200', async () => {
    const response = await request(app)
      .put(`/buildings/${buildingId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedBuilding);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Prédio atualizado com sucesso!');
  });

  // testes para visualição de prédio por id
  it('Should be able to get a building by Id and return 200', async () => {
    const response = await request(app)
      .get(`/buildings/${buildingId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(editedBuilding.name);
    expect(response.body.latitude).toBe(editedBuilding.latitude);
    expect(response.body.longitude).toBe(editedBuilding.longitude);
    expect(response.body.description).toBe(editedBuilding.description);
    expect(response.body.organizationId).toBe(editedBuilding.organization_id);
  });

  it('Should not be able to get a building by Id and return 400', async () => {
    const response = await request(app).get(`/buildings/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id do prédio não encontrado');
  });

  // testes para visualização de todos prédios
  it('Should be able to get all buildings', async () => {
    const response = await request(app).get('/buildings').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(BuildingRepository);
    const allBuildings = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(allBuildings.length);
  });

  // testes para deleção de prédio
  it('Should be able to delete a building', async () => {
    const response = await request(app)
      .delete(`/buildings/${buildingId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(BuildingRepository);
    const deleted = await repository.findOne({ id: buildingId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Prédio removido com sucesso!');
    expect(deleted).toBeUndefined();
  });
});
