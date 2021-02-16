import AWS from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3'
import config from "../config.js"
 
AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'video/webm') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only mp3 or wav is allowed!'), false);
    }
  }
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'audiofilestorage2',
    acl: 'public-read', 
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
export default upload;