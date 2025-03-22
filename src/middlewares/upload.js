import multer from "multer";

// Define storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer instance
export const upload = multer({ storage });

// Export as ES Module
// export default upload;
