const express = require('express');
const router = express.Router();
const RouteHandler = require('./../handlers/route.handler');
const FileHandler = require('./../handlers/file.handler');
const ImageController = require('./../controllers/image.controller');
const ClarifaiController = require('./../controllers/clarifai.controller');

router.get('/', (req, res) => {
    ImageController.getImages().then(images => res.send(images));
});

router.post('/', (req, res) => {
    FileHandler.checkFilesErrors(req.files.images, 'image', 2)
        .then(FileHandler.moveFiles)
        .then(ImageController.setImages)
        .then(newImages => RouteHandler.success(res, 'Images uploaded successfully', newImages))
        .catch(errors => RouteHandler.error(res, 400, 'Upload images failed', errors));
});

router.delete('/:id', (req, res) => {
    let id  = req.params.id;

    ImageController.deleteImage(id)
        .then(FileHandler.getPath)
        .then(FileHandler.deleteFile)
        .then(() => RouteHandler.success(res, 'Image deleted successfully'))
        .catch(err => res.send(err).end());
});

router.get('/details/:id', (req, res) => {
    let id  = req.params.id;

    ImageController.getImageById(id)
        .then(ClarifaiController.getConceptsByImage)
        .then(imageDetails => res.send(imageDetails).end())
        .catch(err => res.send(err).end());
});

router.put('/likes/:id', (req, res) => {
    let id  = req.params.id;

    ImageController.increaseLikeToImage(id)
        .then(image => res.send(image).end());
});

module.exports = router;
