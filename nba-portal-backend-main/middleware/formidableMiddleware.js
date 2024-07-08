const formidableMiddleware = require('express-formidable')
const multer = require('multer')


const FILE_TYPE_MAP = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/reports')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        //console.log(file.mimetype)
        const ext = FILE_TYPE_MAP[file.mimetype];
        cb(null, name+'-'+Date.now()+'.'+ext);
    }
    
})

const uploadMiddleware = multer({storage: storage}).single("first file")


module.exports = uploadMiddleware