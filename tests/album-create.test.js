const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  let artistId;
  beforeEach(async () => {
    const { status, body } = await request(app)
      .post('/artists')
      .send({ name: 'King Gizzard & The Lizard Wizard', genre: 'rock' });

    expect(status).to.equal(201);
    expect(body.name).to.equal('King Gizzard & The Lizard Wizard');
    expect(body.genre).to.equal('rock');
    artistId = body.id;
  });

  describe('/albums', () => {
    describe('POST', () => {
      it('creates an album in the database', async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artistId}/albums`)
          .send({
            name: 'Laminated Denim',
            date: 2022,
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Laminated Denim');
        expect(body.date).to.equal(2022);

        const {
          rows: [albumsData],
        } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
        expect(albumsData.name).to.equal('Laminated Denim');
        expect(albumsData.date).to.equal(2022);
        console.log(albumsData);
      });
    });
  });
});
