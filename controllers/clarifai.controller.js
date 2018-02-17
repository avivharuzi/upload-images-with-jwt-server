const fileHandler = require('./../handlers/file.handler');

const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: 'f2522ccb7abc40858c0ecce40fa7864b'
});

class ClarifaiController {
    static getConceptsByImage(image) {
        return new Promise((resolve, reject) => {
            let imageBase64  = fileHandler.convertToBase64('public/images/', image.src);

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
