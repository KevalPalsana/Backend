import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Function to create the directory if it doesn't exist
const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';
        
        // Ensure the directory based on file type and fieldname
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
            if (file.fieldname === 'image') {
                uploadPath = path.resolve(__dirname, '../uploads/premvatiImages');
            } else if (file.fieldname === 'photo') {
                uploadPath = path.resolve(__dirname, '../uploads/foodItem');
            } else if (file.fieldname === 'uploadImage') {
                uploadPath = path.resolve(__dirname, '../uploads/prePackageFoodItem');
            } else {
                uploadPath = path.resolve(__dirname, '../uploads/other');
            }

            // Ensure the directory exists
            ensureDirectoryExists(uploadPath);

            // Set the upload destination
            cb(null, uploadPath);
        } else {
            // Reject unsupported file types
            return cb(new Error('Unsupported file type'), false);
        }
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export default storage;
