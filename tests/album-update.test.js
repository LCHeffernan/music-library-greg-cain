const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update album', async () => {
  let artistId, albumId;

  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['King Gizzard & The Lizard Wizard', 'rock']
    );
    artistId = rows[0].id;

    const { rows: albumRows } = await db.query(
      'INSERT INTO Albums (name, date, artistid) VALUES($1, $2, $3) RETURNING *',
      ['Laminated Corduroy', 2022, artistId]
    );
    albumId = albumRows[0].id;
  });

  describe('PATCH /albums/:id', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albumId}`)
        .send({ name: 'Laminated Denim', date: 2022 });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: albumId,
        name: 'Laminated Denim',
        date: 2022,
        artistid: artistId,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/99999999')
        .send({ name: 'something', year: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 99999999 does not exist');
    });
  });
});
