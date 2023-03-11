const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let album, artistsId;
  beforeEach(async () => {
    const { rows: artistRows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Vanilla Ice', 'pop/rap']
    );
    artistsId = artistRows[0].id;

    const { rows } = await db.query(
      'INSERT INTO Albums (name, date, artistId) VALUES( $1, $2, $3) RETURNING *',
      ['Hooked', 1989, artistsId]
    );
    album = rows[0];
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'Hooked',
        date: 1989,
        artistid: artistsId,
      });

      const { rows } = await db.query('SELECT * FROM Albums WHERE id = $1', [
        album.id,
      ]);
      expect(rows.length).to.equal(0);
    });
  });

  it('returns a 404 if the album does not exist', async () => {
    const { status, body } = await request(app)
      .delete('/albums/999999999')
      .send();

    expect(status).to.equal(404);
    expect(body.message).to.equal('album 999999999 does not exist');
  });
});
