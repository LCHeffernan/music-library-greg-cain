const express = require('express');
const artistController = require('../controllers/artist');
const artistUpdater = require('../controllers/artist-update');

const router = express.Router();

/**
 * @swagger
 * /artists:
 *  post:
 *      tags:
 *          - Artists
 *      description: Enters new artist into database
 *      parameters:
 *        - in: body
 *          name: artist
 *          description: Artist to enter into database
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - genre
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 *              example:
 *                  name: Ornette Coleman
 *                  genre: Jazz
 *      responses:
 *          201:
 *              description: Artist successfully created
 */
router.post('/', artistController.createArtist);

/**
 * @swagger
 * /artists:
 *  get:
 *      tags:
 *          - Artists
 *      description: Returns all artist records in database.
 *      responses:
 *          200:
 *              description: html content
 */
router.get('/', artistController.getArtists);

/**
 * @swagger
 * /artists/{id}:
 *  get:
 *      tags:
 *          - Artists
 *      description: Get/find an artist by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Numeric ID of artist to find
 *      responses:
 *          200:
 *              description: ID matches artist in database
 *          404:
 *              description: no artist found
 */
router.get('/:id', artistController.getArtist);

/**
 * @swagger
 * /artists/{id}:
 *  put:
 *      tags:
 *          - Artists
 *      description: Update an artist by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Numeric ID of the artist to update
 *        - in: body
 *          name: artist
 *          description: The artist data to update
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 *          required:
 *            - name
 *            - genre
 *          example:
 *            name: John Coltrane
 *            genre: Jazz
 *      responses:
 *          200:
 *              description: The updated artist
 *          404:
 *              description: The artist could not be found
 */
router.put('/:id', artistUpdater.putArtist);

/**
 * @swagger
 * /artists/{id}:
 *  patch:
 *      tags:
 *          - Artists
 *      description: Update an artist by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Numeric ID of the artist to update
 *        - in: body
 *          name: artist
 *          description: The artist data to update
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 *          required:
 *            - name
 *            - genre
 *          example:
 *            name: John Coltrane
 *            genre: Jazz
 *      responses:
 *          200:
 *              description: The updated artist
 *          404:
 *              description: The artist could not be found
 */
router.patch('/:id', artistUpdater.patchArtist);

/**
 * @swagger
 * /artists/{id}:
 *  delete:
 *      tags:
 *          - Artists
 *      description: Deletes artist with matching ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Numeric ID of artist to delete
 *      responses:
 *          200:
 *              description: Artist successfully deleted
 *          404:
 *              description: Couldn't find artist to delete (check if ID is correct. If correct artist has albums which must be removed first)
 */
router.delete('/:id', artistController.deleteArtist);

module.exports = router;
