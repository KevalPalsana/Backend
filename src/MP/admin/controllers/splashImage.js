import  SplashScreenImage from '../models/splashImage.js';
import  multer from 'multer';
import  path from 'path';
import  fs from 'fs';
const BASE_URL = process.env.APP_URL;

const createUploadsDirectory = (uploadPath) => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads/splashScreen');
        createUploadsDirectory(uploadPath);  
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  
    }
});

const upload = multer({ storage: storage });

export const uploadPhoto = upload.single('splashImage');


export const createSplashScreenImage = async (req, res) => {
    try {
        const image = req.file ? `uploads/spalshScreen/${req.file.filename}` : '';

        const newSplashImage = new SplashScreenImage({
            splashImage: `${BASE_URL}/${image}`,
        });

        const savedSplashImage = await newSplashImage.save();

        res.status(201).json({
            status: "success",
            message: 'splash image created successfully',
            data: savedSplashImage
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating splash image',
            error: error.message
        });
    }
};

export const getAllSplashScreenImages = async (req, res) => {
    try {
        const splashScreenImages = await SplashScreenImage.find();
        return res.status(200).json(splashScreenImages);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getSplashScreenImageById = async (req, res) => {
    try {
        const splashScreenImage = await SplashScreenImage.findById(req.params.id);

        if (!splashScreenImage) {
            return res.status(404).json({ message: "Splash screen image not found" });
        }

        return res.status(200).json(splashScreenImage);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateSplashScreenImage = async (req, res) => {
    try {
        const { splashImage } = req.body;

        const updatedSplashScreenImage = await SplashScreenImage.findByIdAndUpdate(
            req.params.id,
            { splashImage },
            { new: true }
        );

        if (!updatedSplashScreenImage) {
            return res.status(404).json({ message: "Splash screen image not found" });
        }

        return res.status(200).json(updatedSplashScreenImage);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteSplashScreenImage = async (req, res) => {
    try {
        const splashScreenImage = await SplashScreenImage.findByIdAndDelete(req.params.id);

        if (!splashScreenImage) {
            return res.status(404).json({ message: "Splash screen image not found" });
        }

        return res.status(200).json({ message: "Splash screen image deleted successfully", data: splashScreenImage });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// export default {uploadPhoto, createSplashScreenImage, getAllSplashScreenImages, getSplashScreenImageById, updateSplashScreenImage, deleteSplashScreenImage}