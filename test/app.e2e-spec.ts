import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('typeorm in nest, just coding');
  });

  describe('/users', () => {
    test('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users');
      expect(res.statusCode).toBe(401);
    });

    test('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'test1@test.com',
        password: 'test',
        username: 'test',
      });

      expect(res.statusCode).toBe(401);
      // console.log(res.body);
    });
  });

  test('/user/login (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/users/login').send({
      email: 'test1@test.com',
      password: 'test',
    });

    expect(res.statusCode).toBe(200);
    // expect(res.headers);
    // console.log(res.headers);
  });
});
