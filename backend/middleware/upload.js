const multer = require('multer');

// Configure Multer for memory storage (we'll upload directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;