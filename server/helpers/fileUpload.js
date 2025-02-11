const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Use the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using current timestamp
  }
});

// Filter for image files only (e.g., .jpg, .jpeg, .png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept file
  } else {
    return cb(new Error('Only image files are allowed!'), false); // Reject file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Apply file filter
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

module.exports = upload; // Export the multer configuration
