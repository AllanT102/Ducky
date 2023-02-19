const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'localStorage/' })
const fileUpload = require('express-fileupload');
const pdf = require('pdf-parse');
const app = express();
app.use(fileUpload());

router.post('/', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const pdfFile = req.file;
    const path = pdfFile.path

    let dataBuffer = fs.readFileSync(path);
    const text =  await pdf(dataBuffer);
    fs.unlink(path, function(err) {
        if (err) console.log(err);
    })

    res.send(text);
})

module.exports = router;