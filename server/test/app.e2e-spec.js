import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { CatchEverythingFilter } from '../src/server/exception-filter';

describe('PostController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // must be added to the nest app here again
    app.useGlobalFilters(new CatchEverythingFilter());

    await app.init();
  });

  // For the sake of simplicity only the seeded data is tested,
  // instead of mocking or altering the database in a test fixture

  it('/api/posts (GET, 200)', async () => {
    const test = await request(app.getHttpServer())
      .get('/api/posts')
      .expect(200);
    const response = test.body;
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveLength(3);
    expect(response.data).toBeSortedBy('created_at', { descending: true });
  });

  it('/api/posts/:id (GET, 200)', async () => {
    const test = await request(app.getHttpServer())
      .get('/api/posts/1')
      .expect(200);
    const response = test.body;
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('id', 1);
  });

  it('/api/posts/:id (GET, 404)', async () => {
    await request(app.getHttpServer()).get('/api/posts/10000').expect(404);
  });

  it('/api/posts/:id/comments (GET, 200)', async () => {
    const test = await request(app.getHttpServer())
      .get('/api/posts/1/comments')
      .expect(200);
    const response = test.body;
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveLength(2);
    expect(response.data).toBeSortedBy('created_at', { descending: true });
    expect(response.data[0]).toHaveProperty('author', 'Test User B');
  });

  it('/api/posts/:id/comments (GET, 404)', async () => {
    const test = await request(app.getHttpServer())
      .get('/api/posts/10000/comments')
      .expect(404);
  });

  it('/api/tags/:name (GET, 200)', async () => {
    const test = await request(app.getHttpServer())
      .get('/api/tags/Business')
      .expect(200);
    const response = test.body;
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveLength(3);
    expect(response.data).toBeSortedBy('created_at', { descending: true });
  });

  it('/api/tags/:name (GET, 404)', async () => {
    await request(app.getHttpServer())
      .get('/api/tags/InvalidTagName')
      .expect(404);
  });
});
