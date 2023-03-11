const express = require('express');
const albumController = require('../controllers/album');
const albumUpdater = require('../controllers/album-update');

const router = express.Router();

/**
 * @swagger
 * /artists/{id}/albums/:
 *  post:
 *      tags:
 *          - Albums
 *      description: Enters new artist into database
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Numeric ID of album's artist
 *        - in: body
 *          name: album
 *          description: Album to enter into database
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - date
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *              example:
 *                  name: The Shape Of Jazz To Come
 *                  date: 1959
 *      responses:
 *          201:
 *              description: Album successfully created
 */
router.post('/:id/albums', albumController.createAlbum);

/**
 * @swagger
 * /albums:
 *  get:
 *      tags:
 *          - Albums
 *      description: Returns all album records in database.
 *      responses:
 *          200:
 *              description: html content
 */
router.get('/', albumController.getAlbums);

/**
 * @swagger
 * /albums/{id}:
 *  get:
 *      tags:
 *          - Albums
 *      description: Get/find an album by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Numeric ID of album to find
 *      responses:
 *          200:
 *              description: ID matches album in database
 *          404:
 *              description: no album found
 */
router.get('/:id', albumController.getAlbum);

/**
 * @swagger
 * /albums/{id}:
 *  patch:
 *      tags:
 *          - Albums
 *      description: Update an album by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Numeric ID of the album to update
 *        - in: body
 *          name: artist
 *          description: The album data to update
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *          required:
 *            - name
 *            - date
 *          example:
 *            name: A Love Supreme
 *            date: 1964
 *      responses:
 *          200:
 *              description: The updated album
 *          404:
 *              description: The album could not be found
 */
router.patch('/:id', albumUpdater.patchAlbum);

/**
 * @swagger
 * /albums/{id}:
 *  delete:
 *      tags:
 *          - Albums
 *      description: Deletes album with matching ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Numeric ID of album to delete
 *      responses:
 *          200:
 *              description: Album successfully deleted
 *          404:
 *              description: Couldn't find album to delete (check if ID is correct)
 */
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
