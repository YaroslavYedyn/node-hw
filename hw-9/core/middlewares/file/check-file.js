const {
    fileOptions: {
        DOCS_MIMETYPES,
        FILE_MAX_SIZE,
        PHOTO_MAX_SIZE,
        PHOTOS_MIMETYPES,
        VIDEO_MAX_SIZE,
        VIDEOS_MIMETYPES
    }
} = require('../../constants');
const { ErrorHandler, errorMessage: { MAX_SIZE_DOC, FILE_NOT_VALID }, errorCode } = require('../../Error');

module.exports = (req, res, next) => {
    try {
        const { files } = req;

        const docs = [];
        const photos = [];
        const videos = [];

        const allFiles = Object.values(files);

        for (let i = 0; i < allFiles.length; i++) {
            const { name, size, mimetype } = allFiles[i];

            if (PHOTOS_MIMETYPES.includes(mimetype)) {
                if (PHOTO_MAX_SIZE < size) {
                    throw new ErrorHandler(errorCode.BAD_REQUEST, MAX_SIZE_DOC.customCode, `file ${name} is too big`);
                }
                photos.push(allFiles[i]);
            } else if (DOCS_MIMETYPES.includes(mimetype)) {
                if (FILE_MAX_SIZE < size) {
                    throw new ErrorHandler(errorCode.BAD_REQUEST, MAX_SIZE_DOC.customCode, `file ${name} is too big`);
                }
                docs.push(allFiles[i]);
            } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                if (VIDEO_MAX_SIZE < size) {
                    throw new ErrorHandler(errorCode.BAD_REQUEST, MAX_SIZE_DOC.customCode, `file ${name} is too big`);
                }
                videos.push(allFiles[i]);
            } else {
                throw new ErrorHandler(errorCode.BAD_REQUEST, FILE_NOT_VALID.customCode, 'File not valid!');
            }
        }

        req.videos = videos;
        req.photos = photos;
        req.docs = docs;
        next();
    } catch (e) {
        next(e);
    }
};
