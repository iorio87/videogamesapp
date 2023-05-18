/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'Bla bla bla',
  released: '2000-07-01',
  platforms: ['Playstation 5']
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should throw an error if name is null', (done) => {
      Videogame.create({
        description: 'Bla bla bla',
        released: '2000-07-01',
        platforms: ['Playstation 5']
      })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should throw an error if description is null', (done) => {
      Videogame.create({
        name: 'Super Mario Bros',        
        released: '2000-07-01',
        platforms: ['Playstation 5']
      })
        .then(() => done(new Error('It requires a description')))
        .catch(() => done());
    });
    it('should throw an error if released is null', (done) => {
      Videogame.create({
        name: 'Super Mario Bros',        
        description: 'Bla bla bla',
        platforms: ['Playstation 5']
      })
        .then(() => done(new Error('It requires a released date!')))
        .catch(() => done());
    });
    it('should throw an error if plataforms is null', (done) => {
      Videogame.create({
        name: 'Super Mario Bros',        
        description: 'Bla bla bla',
        released: '2000-07-01'      
      })
        .then(() => done(new Error('It requires at least one plataform')))
        .catch(() => done());
    });
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
