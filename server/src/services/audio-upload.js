import aws from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3'
 
aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});
const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only mp3 is allowed!'), false);
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