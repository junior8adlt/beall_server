const admin = require('firebase-admin');
const multer = require('multer');
const { getStorage } = require('firebase-admin/storage');
const path = require('path');

// Inicializa Firebase Admin SDK con la clave privada descargada
const serviceAccount = require(path.resolve(
  __dirname,
  '../be-all-fam-285420-firebase-adminsdk-sjw5l-6257c97da1.json',
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'be-all-fam-285420.appspot.com',
});

const bucket = getStorage().bucket();
const upload = multer({ storage: multer.memoryStorage() });

class FirebaseController {
  static async uploadFile(req, res) {
    try {
      upload.single('file')(req, res, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const file = bucket.file(req.file.originalname);
        const stream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        stream.on('finish', async () => {
          const url = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });
          res.status(200).json({ url: url[0] });
        });

        stream.end(req.file.buffer);
      });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
  static async deleteFile(req, res) {
    const { filename } = req.body;
    try {
      await bucket.file(filename).delete();
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
}

module.exports = FirebaseController;
