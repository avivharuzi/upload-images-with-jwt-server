const express = require('express');
const router = express.Router();
const routeHandler = require('./../handlers/route.handler');
const fileHandler = require('./../handlers/file.handler');
const imageController = require('./../controllers/image.controller');
const clarifaiController = require('./../controllers/clarifai.controller');

router.get('/', (req, res) => {
    imageController.getImages().then(images => res.send(images));
});

router.post('/', (req, res) => {
    fileHandler.checkFilesErrors(req.files.images, 'image', 2)
        .then(fileHandler.moveFiles)
        .then(imageController.setImages)
        .then(newImages => routeHandler.success(res, 'Images uploaded successfully', newImages))
        .catch(errors => routeHandler.error(res, 400, 'Upload images failed', errors));
});

router.delete('/:id', (req, res) => {
    let id  = req.params.id;

    imageController.deleteImage(id)
        .then(fileHandler.getPath)
        .then(fileHandler.deleteFile)
        .then(() => routeHandler.success(res, 'Image deleted successfully'))
        .catch(err => res.send(err).end());
});

router.get('/details/:id', (req, res) => {
    let id  = req.params.id;

    imageController.getImageById(id)
        .then(clarifaiController.getConceptsByImage)
        .then(imageDetails => res.send(imageDetails).end())
        .catch(err => res.send(err).end());
});

router.put('/likes/:id', (req, res) => {
    let id  = req.params.id;

    imageController.increaseLikeToImage(id)
        .then(image => res.send(image).end());
});

module.exports = router;
