import request from 'request';
import app from '../index';

describe('Article Route', () => {
  describe('GET all articles', done => {
    it('should respond with an array and a status of 200', () => {
      request(app)
        .get('/api/articles')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET a single article by id', done => {
    it('should respond with an object and a status of 200', () => {
      request(app)
        .get('/api/articles/asdf')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
