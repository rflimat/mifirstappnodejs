const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos');
    },
    filename: (req, file, cb) => {
        if (req.params.id && req.session.open) {
            //cb(null, `${file.fieldname}-${Date.now()}`);
            cb(null, `curso-${req.params.id}.png`);
        } else {
            cb(null, 'toDelete');
        }
    }
});

const upload = multer({storage: storage});

module.exports = {
    upload,
    clearTemporaryFile: () => {
        fs.unlink('photos/toDelete', () => {});
    }
};