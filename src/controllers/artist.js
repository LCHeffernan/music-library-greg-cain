const db = require('../db/index');

const artistController = (req, res) => {
  res.status(201).json({
    name: req.body.name,
    genre: req.body.genre,
  });
};

const createArtist = async (req, res) => {
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtists = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [artist],
    } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      rows: [artist],
    } = await db.query(`DELETE FROM Artists WHERE id = $1 RETURNING *`, [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createArtist,
  getArtists,
  getArtist,
  deleteArtist,
  artistController,
};
