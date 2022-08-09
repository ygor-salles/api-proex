import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnetion from '../../database';
import { IPoint } from '../../interfaces/IPoint.interface';
import { PointRepository } from '../../repositories/PointRepository';

// ids de mapas cadastradas no seeders
const mapId1 = 'b30996e8-e87f-4ce7-aaa2-b76c9bb1cc1e';
const mapId2 = 'd80c3e0f-97b7-4a1d-bba3-384db2c1ff5c';

// id inexistente
const idInexist = 'bf918fbb-94a9-4dd5-9db1-85ce524ed306';

const createPoint : IPoint = {
  name: 'Point Test',
  description: 'Point Test Description',
  floor: 1,
  x: -25.3347702,
  y: -47.5304402,
  breakPoint: true,
  neighbor: JSON.stringify({
    right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
    left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
  }),
  map_id: mapId1,
};

const editPoint = {
  name: 'Point Test Edited',
  description: 'Point Test Description Edited',
  floor: 1,
  x: -25.3347701,
  y: -47.5304401,
  breakPoint: false,
  neighbor: JSON.stringify({
    right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
  }),
  map_id: mapId2,
};

const pointInvalid = {
  name: 'Point Test 2',
  description: 'Point Test Description 2',
  floor: 2,
  x: -25.3347701,
  y: -47.5304401,
  breakPoint: true,
  neighbor: JSON.stringify({
    left: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
  }),
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
    expect(response.body.x).toBe(createPoint.x);
    expect(response.body.y).toBe(createPoint.y);
    expect(response.body.breakPoint).toBe(createPoint.breakPoint);
    expect(response.body.neighbor).toBe(createPoint.neighbor);
    expect(response.body.map_id).toBe(createPoint.map_id);
  });

  it('Should returns 400 beacause there is no point name', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
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
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
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
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O Andar é obrigatório');
  });

  it('Should returns 400 beacause there is no point x', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        y: -47.5304402,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A coordenada x é obrigatória');
  });

  it('Should returns 400 beacause there is no point y', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A coordenada y é obrigatória');
  });

  it('Should returns 400 beacause there is no point break point', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O Break Point é obrigatório');
  });

  it('Should returns 400 beacause there is no point neighbor', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Os vizinhos são obrigatórios');
  });

  it('Should returns 400 beacause neighbor is not a valid JSON', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: "{notJSON}",
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Os vizinhos não estão em formato JSON');
  });

  it('Should returns 400 beacause there is no point map_id', async () => {
    const response = await request(app)
      .post('/points')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: JSON.stringify({
          right: "9fcbbe36-b52d-4192-8ff3-987049d7d9b3",
          left: "4ae7a74c-b598-404d-8fc0-6fa7b8c5c822"
        }),
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id de mapa é obrigatório');
  });

  it('Should not be able to create a point that already exists and return 400', async () => {
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
    expect(editPoint.x).toBe(pointUpdated.x);
    expect(editPoint.y).toBe(pointUpdated.y);
    expect(editPoint.breakPoint).toBe(pointUpdated.breakPoint);
    expect(editPoint.neighbor).toBe(pointUpdated.neighbor);
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

  it('Should returns 400 beacause neighbor is not a valid JSON', async () => {
    const response = await request(app)
      .put(`/points/${pointId}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Point Test',
        description: 'Point Test Description',
        floor: 1,
        x: -25.3347702,
        y: -47.5304402,
        breakPoint: true,
        neighbor: "{notJSON}",
        map_id: mapId1,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Os vizinhos não estão em formato JSON');
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
    expect(response.body.x).toBe(editPoint.x);
    expect(response.body.y).toBe(editPoint.y);
    expect(response.body.breakPoint).toBe(editPoint.breakPoint);
    expect(response.body.neighbor).toBe(editPoint.neighbor);
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
