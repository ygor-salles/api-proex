import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';
import { PointRepository } from '../../repositories/PointRepository';

// ids de mapas cadastradas no seeders
const mapId1 = 'b30996e8-e87f-4ce7-aaa2-b76c9bb1cc1e';
const mapId2 = 'd80c3e0f-97b7-4a1d-bba3-384db2c1ff5c';

// id inexistente
const idInexist = 'bf918fbb-94a9-4dd5-9db1-85ce524ed306';

const createPoint = {
  name: 'Point Test',
  description: 'Point Test Description',
  floor: 1,
  altitude: 2.324,
  latitude: -25.3347702,
  longitude: -47.5304402,
  isObstacle: true,
  map_id: mapId1,
};

const editPoint = {
  name: 'Point Test Edited',
  description: 'Point Test Description Edited',
  floor: 2,
  altitude: 3.123,
  latitude: -25.3347701,
  longitude: -47.5304401,
  isObstacle: false,
  map_id: mapId2,
};

const pointInvalid = {
  name: 'Point Test 2',
  description: 'Point Test Description 2',
  floor: 2,
  altitude: 2.321,
  latitude: -25.3347701,
  longitude: -47.5304401,
  isObstacle: true,
  map_id: idInexist,
};

// usuário criado na execução dos seeders
const loginUser = {
  email: 'user1@gmail.com',
  password: '123456',
};

let token: string;
let pointId: string;

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

  // testes para criação de pontos
  it('Should be able to create a new point and return 201', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send(createPoint);

    pointId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(createPoint.name);
    expect(response.body.description).toBe(createPoint.description);
    expect(response.body.floor).toBe(createPoint.floor);
    expect(response.body.altitude).toBe(createPoint.altitude);
    expect(response.body.latitude).toBe(createPoint.latitude);
    expect(response.body.longitude).toBe(createPoint.longitude);
  });

  it('Should returns 400 beacause there is no point name', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        description: 'Point Test Description',
        floor: 1,
        altitude: 2.324,
        latitude: -25.3347702,
        longitude: -47.5304402,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Nome é obrigatório');
  });

  it('Should returns 400 beacause there is no point description', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        floor: 1,
        altitude: 2.324,
        latitude: -25.3347702,
        longitude: -47.5304402,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Descrição é obrigatória');
  });

  it('Should returns 400 beacause there is no point floor', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        altitude: 2.324,
        latitude: -25.3347702,
        longitude: -47.5304402,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O Andar é obrigatório');
  });

  it('Should returns 400 beacause there is no point altitude', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        latitude: -25.3347702,
        longitude: -47.5304402,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A Altitude é obrigatória');
  });

  it('Should returns 400 beacause there is no point latitude', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        altitude: 2.324,
        longitude: -47.5304402,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A Latitude é obrigatória');
  });

  it('Should returns 400 beacause there is no point longitude', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        altitude: 2.324,
        latitude: -25.3347702,
        isObstacle: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A Longitude é obrigatória');
  });

  it('Should returns 400 beacause there is no point obstacle', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        altitude: 2.324,
        latitude: -25.3347702,
        longitude: -47.5304402,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O obstáculo é obrigatório');
  });

  it('Should returns 400 beacause there is no point map_id', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        altitude: 2.324,
        latitude: -25.3347702,
        longitude: -47.5304402,
        isObstacle: true,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de mapa é obrigatório');
  });

  it('Should not be able to create a point with exists and return 400', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send(createPoint);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Ponto já existe');
  });

  it('Should return 404 because when registering point, map_id does not exist in the database', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send(pointInvalid);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Id de mapa não existe');
  });

  // testes para edição de pontos
  it('Should be able to edit a existing point and return 200', async () => {
    const response = await request(app)
      .put(`/points/${pointId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editPoint);

    const repository = getCustomRepository(PointRepository);
    const pointUpdated = await repository.findOne({ id: pointId });

    expect(response.status).toBe(200);
    expect(editPoint.name).toBe(pointUpdated.name);
    expect(editPoint.description).toBe(pointUpdated.description);
    expect(editPoint.floor).toBe(pointUpdated.floor);
    expect(editPoint.altitude).toBe(pointUpdated.altitude);
    expect(editPoint.latitude).toBe(pointUpdated.latitude);
    expect(editPoint.longitude).toBe(pointUpdated.longitude);
    expect(editPoint.isObstacle).toBe(pointUpdated.isObstacle);
    expect(editPoint.map_id).toBe(pointUpdated.map_id);
    expect(response.body.message).toBe('Ponto atualizado com sucesso!');
  });

  it('Should return 400 when update point by invalid type id', async () => {
    const response = await request(app)
      .put(`/points/2`)
      .set('Authorization', `bearer ${token}`)
      .send(editPoint);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de ponto deve ser do tipo uuid');
  });

  it('Should return 404 because when update point, map_id does not exist in the database', async () => {
    const response = await request(app)
      .put(`/points/${pointId}`)
      .set('Authorization', `bearer ${token}`)
      .send(pointInvalid);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Id de mapa não existe');
  });

  it('Should return 404 for update missing id point', async () => {
    const response = await request(app)
      .put(`/points/${idInexist}`)
      .set('Authorization', `bearer ${token}`)
      .send(editPoint);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Ponto não existe!');
  });

  // testes para visualição de ponto por id
  it('Should be able to get a point by Id and return 200', async () => {
    const response = await request(app)
      .get(`/points/${pointId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(editPoint.name);
    expect(response.body.description).toBe(editPoint.description);
    expect(response.body.floor).toBe(editPoint.floor);
    expect(response.body.altitude).toBe(editPoint.altitude);
    expect(response.body.latitude).toBe(editPoint.latitude);
    expect(response.body.longitude).toBe(editPoint.longitude);
    expect(response.body.isObstacle).toBe(editPoint.isObstacle);
    expect(response.body.map_id).toBe(editPoint.map_id);
  });

  it('Should return 404 for searching missing id point', async () => {
    const response = await request(app)
      .get(`/points/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Ponto não existe!');
  });

  it('Should return 400 when searching point by invalid type id', async () => {
    const response = await request(app).get(`/points/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de ponto deve ser do tipo uuid');
  });

  // testes para visualização de todos pontos
  it('Should be able to get all buildings', async () => {
    const response = await request(app).get('/points').set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(PointRepository);
    const allPoints = await repository.find();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(allPoints.length);
  });

  // testes para deleção de ponto
  it('Should be able to delete a point', async () => {
    const response = await request(app)
      .delete(`/points/${pointId}`)
      .set('Authorization', `bearer ${token}`);

    const repository = getCustomRepository(PointRepository);
    const deleted = await repository.findOne({ id: pointId });

    expect(response.status).toBe(200);
    expect(deleted).toBeUndefined();
    expect(response.body.message).toBe('Ponto removido com sucesso!');
  });

  it('Should return 400 when delete point by invalid type id', async () => {
    const response = await request(app).delete(`/points/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de ponto deve ser do tipo uuid');
  });

  it('Should return 404 for delete missing id point', async () => {
    const response = await request(app)
      .delete(`/points/${idInexist}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Ponto não existe!');
  });
});
