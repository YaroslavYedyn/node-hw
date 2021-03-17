const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs-extra').promises;

module.exports = {
    downloadFile: async (file, fileType, item, pathFolderName) => {
        const pathWithoutStatic = path.join(pathFolderName, `${item.id}`, fileType);
        const documentFolder = path.join(process.cwd(), 'homework-10', 'core', 'static', pathWithoutStatic);

        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuid()}.${fileExtension}`;

        const pathDocument = path.join(documentFolder, fileName);
        const uploadPath = path.join(pathWithoutStatic, fileName);

        await fs.mkdir(documentFolder, { recursive: true });
        await file.mv(pathDocument);
        return uploadPath;
    },
};
