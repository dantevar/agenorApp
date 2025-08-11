const request = require('supertest');
const express = require('express');
const path = require('path');

// Import routers
const apiRouter = require('./routes/apiRouter');
const indexRouter = require('./routes/indexRouter');
const menuRouter = require('./routes/menuRouter');
const poolsRouter = require('./routes/poolsRouter');
const filtersRouter = require('./routes/filtersRouter');
const cleaningRouter = require('./routes/cleaningRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/menu', menuRouter);
app.use('/pools', poolsRouter);
app.use('/filters', filtersRouter);
app.use('/cleaning', cleaningRouter);
app.use('/admin', adminRouter);

// MOCK DB SETUP
jest.mock('./db/index', () => {
  let objects = [{ object_id: 1, name: 'Objekt1' }];
  let pools = [{ pool_id: 1, pool_name: 'Bazen1', pool_capacity: 100, object_id: 1 }];
  let waterAdditions = [];
  let poolVisits = [];
  return {
    query: jest.fn((sql, params) => {
      if (sql.includes('SELECT * FROM objects')) return Promise.resolve({ rows: objects });
      if (sql.includes('SELECT * FROM pools')) return Promise.resolve({ rows: pools });
      if (sql.includes('SELECT object_id FROM objects')) return Promise.resolve({ rows: objects.filter(o => o.name === params[0]) });
      if (sql.includes('SELECT pool_id, pool_name, pool_capacity FROM pools WHERE object_id = $1')) return Promise.resolve({ rows: pools.filter(p => p.object_id === params[0]) });
      if (sql.includes('SELECT pool_id, addition_date, capacity')) return Promise.resolve({ rows: waterAdditions.filter(a => params[0].includes(a.pool_id) && a.addition_date >= params[1] && a.addition_date <= params[2]) });
      if (sql.includes('SELECT pool_id, visit_date, n_visitors')) return Promise.resolve({ rows: poolVisits.filter(v => params[0].includes(v.pool_id) && v.visit_date >= params[1] && v.visit_date <= params[2]) });
      if (sql.includes('INSERT INTO water_additions')) { waterAdditions.push({ pool_id: params[0], addition_date: params[1], capacity: params[2] }); return Promise.resolve(); }
      if (sql.includes('UPDATE water_additions')) { let a = waterAdditions.find(x => x.pool_id === params[1] && x.addition_date === params[2]); if (a) a.capacity = params[0]; return Promise.resolve(); }
      if (sql.includes('INSERT INTO pool_visits')) { poolVisits.push({ pool_id: params[0], visit_date: params[1], n_visitors: params[2] }); return Promise.resolve(); }
      if (sql.includes('UPDATE pool_visits')) { let v = poolVisits.find(x => x.pool_id === params[1] && x.visit_date === params[2]); if (v) v.n_visitors = params[0]; return Promise.resolve(); }
      return Promise.resolve({ rows: [] });
    })
  };
});



describe('API routes POST then GET (mocked DB)', () => {
  // API

  it('GET /api/objects', async () => {
    const res = await request(app).get('/api/objects');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Objekt1');
  });

  it('GET /api/pools', async () => {
    const res = await request(app).get('/api/pools');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].pool_name).toBe('Bazen1');
  });

  // ADMIN

  // CLEANING


  // FILTERS
  it('POST/GET /filters', async () => {
    const dummy = { test: 'filters' };
    await request(app).post('/filters/filters').send(dummy);
    const res = await request(app).get('/filters/filters').query({ object_id: 1 });
    expect(res.statusCode).toBe(200);
  });

  // POOLS
  it('POST/GET /pools', async () => {
    const dummy = { test: 'pools' };
    await request(app).post('/pools').send(dummy);
    const res = await request(app).get('/pools').query({ object_id: 1 });;
    expect(res.statusCode).toBe(200);
  });

  // MENU
  it('POST/GET /menu', async () => {
    const dummy = { test: 'menu' };
    await request(app).post('/menu').send(dummy);
    const res = await request(app).get('/menu');
    expect(res.statusCode).toBe(200);
  });
});

describe('All real routes (mocked DB)', () => {
  // INDEX
  it('GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
  it('POST /', async () => {
    const res = await request(app).post('/').send({ email: 'test@test.com', password: 'test' });
    expect(res.statusCode).toBe(200);
  });
  it('POST /signup', async () => {
    const res = await request(app).post('/signup').send({ email: 'test2@test.com', password: 'test', phone: '123', group: 'A' });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('GET /objects', async () => {
    const res = await request(app).get('/objects');
    expect(res.statusCode).toBe(200);
  });

  // MENU
  it('GET /menu/', async () => {
    const res = await request(app).get('/menu/');
    expect(res.statusCode).toBe(200);
  });
  it('GET /menu/test', async () => {
    const res = await request(app).get('/menu/test');
    expect([200,404]).toContain(res.statusCode);
  });

  // POOLS
  it('GET /pools/', async () => {
    const res = await request(app).get("/pools").query({ object_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('POST /pools/cleaning_logs', async () => {
    const res = await request(app).post('/pools/cleaning_logs').send({ test: 'clean' });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('GET /pools/cleaning_logs', async () => {
    const res = await request(app).get('/pools/cleaning_logs');
    expect(res.statusCode).toBe(200);
  });
  it('GET /pools/spa_pools/1', async () => {
    const res = await request(app).get('/pools/spa_pools/1');
    expect([200,404]).toContain(res.statusCode);
  });
  it('GET /pools/object', async () => {
    const res = await request(app).get('/pools/object');
    expect(res.statusCode).toBe(200);
  });

  // FILTERS
  it('GET /filters/all', async () => {
    const res = await request(app).get('/filters/all');
    expect(res.statusCode).toBe(200);
  });
  it('GET /filters/filters', async () => {
    const res = await request(app).get('/filters/filters');
    expect(res.statusCode).toBe(200);
  });
  it('GET /filters/logs', async () => {
    const res = await request(app).get('/filters/logs');
    expect(res.statusCode).toBe(200);
  });

  // CLEANING
  it('GET /cleaning/logs', async () => {
    const res = await request(app).get('/cleaning/logs').query({ pool: 1, year: 2025, month: 8 });
    expect(res.statusCode).toBe(200);
  });
  it('GET /cleaning/plan', async () => {
    const res = await request(app).get('/cleaning/plan').query({ pool: 1 });
    expect(res.statusCode).toBe(200);
  });
  it('POST /cleaning/setplan', async () => {
    const res = await request(app).post('/cleaning/setplan').send({ test: 'plan' });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('POST /cleaning/addlog', async () => {
    const res = await request(app).post('/cleaning/addlog').send({ test: 'log' });
    expect([200,201,400]).toContain(res.statusCode);
  });

  // ADMIN
  it('POST /admin/newobject', async () => {
    const res = await request(app).post('/admin/newobject').send({ name: 'ObjektX' });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('POST /admin/newpool', async () => {
    const res = await request(app).post('/admin/newpool').send({ name: 'BazenX' });
    expect([200,201,400]).toContain(res.statusCode);
  });

  // API
  it('GET /api/objects', async () => {
    const res = await request(app).get('/api/objects');
    expect(res.statusCode).toBe(200);
  });
  it('GET /api/pools', async () => {
    const res = await request(app).get('/api/pools');
    expect(res.statusCode).toBe(200);
  });
  it('GET /api/water_additions', async () => {
    const res = await request(app).get('/api/water_additions').query({ objekt: 1, godina: '2025', mjesec: '08' });
    expect(res.statusCode).toBe(200);
  });
  it('POST /api/water_additions', async () => {
    const additions = [{ pool_id: 1, date: '2025-08-11', capacity: 123 }];
    const res = await request(app).post('/api/water_additions').send({ additions });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('GET /api/pool_visits', async () => {
    const res = await request(app).get('/api/pool_visits').query({ objekt: 1, godina: '2025', mjesec: '08' });
    expect(res.statusCode).toBe(200);
  });
  it('POST /api/pool_visits', async () => {
    const visits = [{ pool_id: 1, visit_date: '2025-08-11', n_visitors: 42 }];
    const res = await request(app).post('/api/pool_visits').send({ visits });
    expect([200,201,400]).toContain(res.statusCode);
  });
  it('GET /api/ukl_nedostataka', async () => {
    const res = await request(app).get('/api/ukl_nedostataka');
    expect([200,404]).toContain(res.statusCode);
  });
  it('POST /api/ukl_nedostataka', async () => {
    const res = await request(app).post('/api/ukl_nedostataka').send({ test: 'nedostatak' });
    expect([200,201,400,404]).toContain(res.statusCode);
  });
});
