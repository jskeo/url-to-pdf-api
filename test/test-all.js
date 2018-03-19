/* eslint-env mocha */
const chai = require('chai');
const request = require('supertest');
const { getResource } = require('./util');
const createApp = require('../src/app');

const app = createApp();

describe('GET /api/render', () => {
  it('request must fail when not from allowed domain', () =>
    request(app).get('/api/render').expect(403)
  );

  it('invalid domain should cause an error', () =>
    request(app)
      .get('/api/render')
      .query({
        url: 'https:\/\/self-signed.badssl.com',
      })
      .expect(403)
  );
  
  it('valid domain from env-vars should return 200', () =>
    request(app)
      .get('/api/render')
      .query({
        url: 'https:\/\/admin.bottimmo.de',
      })
      .expect(200)
  );


  it('bug in original. this version should not take other domains than the allowed one but throw 403. for ref invalid cert should be status 200 when ignoreHttpsErrors=true', () =>
    request(app)
      .get('/api/render')
      .query({
        url: 'https:\/\/self-signed.badssl.com',
        ignoreHttpsErrors: true,
      })
      .expect(403)
  );
});

describe('POST /api/render', () => {
  it('POST method should not succeed but throw forbidden', () =>
    request(app)
      .post('/api/render')
      .send({
        pdf: { scale: 2 },
      })
      .set('content-type', 'application/json')
      .expect(403)
  );

  it('render google.com should throw forbidden', () =>
    request(app)
      .post('/api/render')
      .send({ url: 'https://google.com' })
      .set('content-type', 'application/json')
      .expect(403)
      .expect('content-type', 'application/pdf')
      .then((response) => {
        const length = Number(response.headers['content-length']);
        chai.expect(length).to.be.above(1024 * 40);
      })
  );

  it('html in json body should be forbidden', () =>
    request(app)
      .post('/api/render')
      .send({ html: getResource('postmark-receipt.html') })
      .set('content-type', 'application/json')
      .expect(403)
      .expect('content-type', 'application/pdf')
      .then((response) => {
        const length = Number(response.headers['content-length']);
        chai.expect(length).to.be.above(1024 * 40);
      })
  );

  it('html as text body should be forbidden', () =>
    request(app)
      .post('/api/render')
      .send(getResource('postmark-receipt.html'))
      .set('content-type', 'text/html')
      .expect(403)
      .expect('content-type', 'application/pdf')
      .then((response) => {
        const length = Number(response.headers['content-length']);
        chai.expect(length).to.be.above(1024 * 40);
      })
  );
});
