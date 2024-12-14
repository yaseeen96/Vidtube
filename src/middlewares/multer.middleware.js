import multer from "multer";
import path from "path";

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use Heroku's temporary directory
    cb(null, path.join("/tmp"));
  },
  filename: function (req, file, cb) {
    // Save the file with its original name or generate a unique name if needed
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer upload instance
export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Set a file size limit (e.g., 10 MB)
  },
  fileFilter: function (req, file, cb) {
    // Optional: Filter files by mimetype
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});
