const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const { status, body } = await request(app).post('/artists').send({
          name: 'King Gizzard & The Lizard Wizard',
          genre: 'rock',
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('King Gizzard & The Lizard Wizard');
        expect(body.genre).to.equal('rock');

        const {
          rows: [artistData],
        } = await db.query(`SELECT * FROM Artists WHERE id = ${body.id}`);
        expect(artistData.name).to.equal('King Gizzard & The Lizard Wizard');
        expect(artistData.genre).to.equal('rock');
      });
    });
  });
});
