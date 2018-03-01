const FileHandler = require('./../handlers/file.handler');

const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

class ClarifaiController {
    static getConceptsByImage(image) {
        return new Promise((resolve, reject) => {
            let imageBase64  = FileHandler.convertToBase64(process.env.IMAGES_PATH, image.src);

            clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, { base64: imageBase64 })
                .then((response) => {
                    resolve(
                        {
                            clarifai: response.outputs[0].data.concepts,
                            image: image
                        }
                    );
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = ClarifaiController;
