const Image = require('./../models/image.model');

class ImageController {
    static getImages() {
        return new Promise((resolve, reject) => {
            Image.find()
                .exec((err, images) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(images);
                    }
                });
        });
    }

    static setImages(images) {
        return new Promise((resolve, reject) => {
            let imagesObjArr = ImageController.convertImagesToObjArr(images);

            Image.create(imagesObjArr, (err, newImages) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newImages);
                }
            });
        });
    }

    static getImageById(id) {
        return new Promise((resolve, reject) => {
            Image.findById(id)
                .exec((err, image) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (image !== null) {
                            resolve(image);
                        } else {
                            reject(['No image found']);
                        }
                    }
                });
        });
    }

    static increaseLikeToImage(id) {
        return new Promise((resolve, reject) => {
            Image.findByIdAndUpdate(id, { $inc: { 'likes': 1 } })
                .exec((err, image) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(image);
                    }
                });
        });
    }

    static deleteImage(id) {
        return new Promise((resolve, reject) => {
            Image.findByIdAndRemove(id, (err, image) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(image);
                }
            });
        });
    }

    static convertImagesToObjArr(images) {
        let temp = [];
        for (let i = 0; i < images.length; i++) {
            temp.push({
                src: images[i],
                likes: 0
            });
        }
        return temp;
    }
}

module.exports = ImageController;
