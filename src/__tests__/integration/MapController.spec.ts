import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';
import { MapRepository } from '../../repositories/MapRepository';

// ids de organizações cadastradas no seeders
const buildingId1 = '5a6d70a4-d0c6-4f38-90fe-730fed66cd66';
const buildingId2 = 'f372b5a3-bf4d-4fe8-bd4b-07fe1fb33011';

const createMap = {
  name: 'Map Test',
  source: 'https://www.joaoleitao.com/viagens/wp-content/uploads/2008/05/MAPA-DO-MUNDO-1.jpg',
  description: 'Map Test Description',
  building_id: buildingId1,
};

const editedMap = {
  name: 'Map Test editado',
  source: 'https://www.joaoleitao.com/viagens/wp-content/uploads/2008/05/MAPA-DO-MUNDO-1.jpg',
  description: 'Descrição do map Test editado',
  building_id: buildingId2,
};

// usuário criado na execução dos seeders
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

let token: string;
let mapId: string;

describe('Maps', () => {
  beforeAll(async () => {
    await createConnetion();
    const Login = await request(app).post('/login').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  // testes para criação de mapas
  it('Should be able to create a new map and return 201', async () => {
    const response = await request(app)
      .post('/maps')
      .set('Authorization', `bearer ${token}`)
      .send(createMap);

    mapId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createMap.name);
    expect(response.body.source).toBe(createMap.source);
    expect(response.body.description).toBe(createMap.description);
    expect(response.body.building_id).toBe(createMap.building_id);
  });

  it('Should returns 400 beacause there is no map name', async () => {
    const response = await request(app).post('/maps').set('Authorization', `bearer ${token}`).send({
      source: 'https://www.joaoleitao.com/viagens/wp-content/uploads/2008/05/MAPA-DO-MUNDO-1.jpg',
      description: 'Map Test Description',
      building_id: buildingId1,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Nome é obrigatório');
  });

  it('Should returns 400 beacause there is no map source', async () => {
    const response = await request(app).post('/maps').set('Authorization', `bearer ${token}`).send({
      name: 'Map Test',
      description: 'Map Test Description',
      building_id: buildingId1,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Url é obrigatório');
  });

  it('Should returns 400 beacause there is no map description', async () => {
    const response = await request(app).post('/maps').set('Authorization', `bearer ${token}`).send({
      name: 'Map Test',
      source: 'https://www.joaoleitao.com/viagens/wp-content/uploads/2008/05/MAPA-DO-MUNDO-1.jpg',
      building_id: buildingId1,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Descrição é obrigatória');
  });

  it('Should returns 400 beacause there is no map building_id', async () => {
    const response = await request(app).post('/maps').set('Authorization', `bearer ${token}`).send({
      name: 'Map Test',
      source: 'https://www.joaoleitao.com/viagens/wp-content/uploads/2008/05/MAPA-DO-MUNDO-1.jpg',
      description: 'Map Test Description',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de prédio é obrigatório');
  });

  it('Should not be able to create a map with exists and return 400', async () => {
    const response = await request(app)
      .post('/maps')
      .set('Authorization', `bearer ${token}`)
      .send(createMap);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mapa já existe');
  });

  // testes para edição de mapas
  it('Should be able to edit a existing map and return 200', async () => {
    const response = await request(app)
      .put(`/maps/${mapId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedMap);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Mapa atualizado com sucesso!');
  });

  // testes para visualição de mapa por id
  it('Should be able to get a map by Id and return 200', async () => {
    const response = await request(app)
      .get(`/maps/${mapId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(editedMap.name);
    expect(response.body.source).toBe(editedMap.source);
    expect(response.body.description).toBe(editedMap.description);
    expect(response.body.building_id).toBe(editedMap.building_id);
  });

  it('Should not be able to get a map by Id and return 400', async () => {
    const response = await request(app).get(`/maps/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id do mapa não encontrado');
  });

  // testes para visualização de todos mapas
  it('Should be able to get all buildings', async () => {
    const response = await request(app).get('/maps').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(MapRepository);
    const allMaps = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(allMaps.length);
  });

  // testes para deleção de mapa
  it('Should be able to delete a map', async () => {
    const response = await request(app)
      .delete(`/maps/${mapId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(MapRepository);
    const deleted = await repository.findOne({ id: mapId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('Mapa removido com sucesso!');
  });
});
