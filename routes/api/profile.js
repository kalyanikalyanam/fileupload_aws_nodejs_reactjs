const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: "AKIAWB7JLP6H45GLPTX6",
  secretAccessKey: "wfQaBxB/qjYoV8XhGTRG6I5rKWTvfzbB0C+Fqw+c",
  Bucket: "samplemedia",
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "samplemedia",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 100000000 }, // In bytes: 100000000 bytes = 1 GB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpg|jpeg|svg|ico|png|gif|jpe|jif|jfif|jfi/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:  Only images(jpg|jpeg|svg|ico|png|gif|jpe|jif|jfif|jfi)");
    // mp4|m4v|avi|3gp
  }
}

/**
 * @route POST /api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/profile-img-upload", (req, res) => {
  profileImgUpload(req, res, (error) => {
    console.log("requestOkokok", req.file);
    console.log("error", error);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});
router.get("/signUrl/put", function (req, res, next) {
  console.log("hi");
  const key = `${req.query.directory}/${shortid.generate()}`; // for the chat, it will be the participant_id
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: req.query.bucket,
      Key: key,
      Expires: 180,
      ContentType: req.query.contentType,
      Metadata: {
        fileName: req.query.fileName,
      },
    },
    (err, url) => {
      if (err) {
        console.log(err);
        res.status(500).json("Internal server error");
      } else {
        res.status(200).json({ url: url, key: key, method: "put", fields: {} });
      }
    }
  );
});
/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
// const uploadsBusinessGallery = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "orionnewbucket",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(
//         null,
//         path.basename(file.originalname, path.extname(file.originalname)) +
//           "-" +
//           Date.now() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
//   limits: { fileSize: 8000000 }, // In bytes: 8000000 bytes = 8 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).array("galleryImage", 4);
/**
 * @route POST /api/profile/multiple-file-upload
 * @desc Upload business Gallery images
 * @access public
 */
// router.post("/multiple-file-upload", (req, res) => {
//   uploadsBusinessGallery(req, res, (error) => {
//     console.log("files", req.files);
//     if (error) {
//       console.log("errors", error);
//       res.json({ error: error });
//     } else {
//       // If File not found
//       if (req.files === undefined) {
//         console.log("Error: No File Selected!");
//         res.json("Error: No File Selected");
//       } else {
//         // If Success
//         let fileArray = req.files,
//           fileLocation;
//         const galleryImgLocationArray = [];
//         for (let i = 0; i < fileArray.length; i++) {
//           fileLocation = fileArray[i].location;
//           console.log("filenm", fileLocation);
//           galleryImgLocationArray.push(fileLocation);
//         }
//         // Save the file name into database
//         res.json({
//           filesArray: fileArray,
//           locationArray: galleryImgLocationArray,
//         });
//       }
//     }
//   });
// });

/**
 * Single video Upload
 */
const videoUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "samplemedia",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 100000000 }, // In bytes: 100000000 bytes = 1 GB
  fileFilter: function (req, file, cb) {
    checkFileType1(file, cb);
  },
}).single("videoupload");

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType1(file, cb) {
  // Allowed ext
  const filetypes = /mp4/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:  Only videos(mp4)");
    // mp4|m4v|avi|3gp
  }
}

/**
 * @route POST /api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/video-upload", (req, res) => {
  videoUpload(req, res, (error) => {
    console.log("requestOkokok", req.file);
    console.log("error", error);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const videoName = req.file.key;
        const videoLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: videoName,
          location: videoLocation,
        });
      }
    }
  });
});

module.exports = router;
