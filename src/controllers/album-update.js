const db = require('../db/index');

const patchAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, date, artistid } = req.body;

  let query, params;

  if (name && date && artistid) {
    query = `UPDATE Albums SET name = $1, date = $2, artistid = $3 WHERE id = $4 RETURNING name, date, artistid, id`;
    params = [name, date, artistid, id];
  } else if (name && date) {
    query = `UPDATE Albums SET name = $1, date = $2 WHERE id = $3 RETURNING name, date, artistid, id`;
    params = [name, date, id];
  } else if (name) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING name, date, artistid, id`;
    params = [name, id];
  } else if (date) {
    query = `UPDATE Albums SET date = $1 WHERE id = $2 RETURNING name, date, artistid, id`;
    params = [date, id];
  }
  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `Album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

module.exports = { patchAlbum };
