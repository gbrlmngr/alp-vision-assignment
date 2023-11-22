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

  afterEach(() => {
    app.close();
  });

  it('Success: /v1/meaning (POST)', () => {
    return request(app.getHttpServer())
      .post('/meaning')
      .send({ text: '[E2E] This is a test!' })
      .expect(201)
      .then((response) => {
        expect(response.text).toBe('OK');
      });
  });

  it('Validation failure: /v1/meaning (POST)', () => {
    return request(app.getHttpServer())
      .post('/meaning')
      .send({ text: '' })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 400,
          message: 'Bad Request',
        });
      });
  });
});
