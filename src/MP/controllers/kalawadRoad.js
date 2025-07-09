import KalawadRoadFeedback from '../models/kalawadPremvati.js';
import Feedback from '../models/feedback.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

//Upload Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const filename = `image_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

//Take A Picture
const saveImage = (base64String) => {
    const matches = base64String.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    const extension = matches[1];
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');

    const filename = `image_${Date.now()}.${extension}`;
    const filepath = path.join(__dirname, '../uploads', filename);

    fs.writeFileSync(filepath, buffer);
    return `/uploads/${filename}`;
};

const createFeedback = [
    upload.single('imageFile'),
    async (req, res) => {
        try {
            const feedbackData = req.body;

            const services = feedbackData.services || {};

            let savedImageUrl = null;
            if (req.file) {
                savedImageUrl = `/uploads/${req.file.filename}`;
            } else if (req.body.imageUrl) {
                savedImageUrl = saveImage(req.body.imageUrl);
            }

            const newForm = new KalawadRoadFeedback({
                ...feedbackData,
                imageUrl: savedImageUrl,
                services: {
                    orderMethod: feedbackData.services.orderMethod,
                    qualityFood: feedbackData.services.qualityFood,
                    tasteOfFood: feedbackData.services.tasteOfFood,
                    servingMethod: feedbackData.services.servingMethod,
                    staffBehaviour: feedbackData.services.staffBehaviour,
                    cleanliness: feedbackData.services.cleanliness
                },
                locationName: "Kalawad Road"
            });

            await newForm.save();

            const newFeedback = new Feedback({
                _id: newForm._id,
                ...feedbackData,
                imageUrl: savedImageUrl,
                services: {
                    orderMethod: feedbackData.services.orderMethod,
                    qualityFood: feedbackData.services.qualityFood,
                    tasteOfFood: feedbackData.services.tasteOfFood,
                    servingMethod: feedbackData.services.servingMethod,
                    staffBehaviour: feedbackData.services.staffBehaviour,
                    cleanliness: feedbackData.services.cleanliness,
                },
                locationName: "Kalawad Road"
            });

            await newFeedback.save();
            res.status(201).json({ ...newForm._doc, imageUrl: savedImageUrl });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await KalawadRoadFeedback.find();
        res.json({feedbacks});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignFeedback = async (req, res) => {
    const { id } = req.params;
    const { assignedRole } = req.body;

    try {
        const feedback = await KalawadRoadFeedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        feedback.assignedRole = assignedRole;
        await feedback.save();

        res.status(200).json({ message: 'Feedback assigned successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning feedback', error });
    }
};

const getFeedbacksByRole = async (req, res) => {
    try {
        const role = req.query.role;

        let query = {};


        if (role && role !== 'admin') {
            query = { assignedRole: role };
        }

        const feedbacks = await KalawadRoadFeedback.find(query);
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Attempt to find and delete the document
      const deletedRecord = await KalawadRoadFeedback.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({
          message: 'Record not found for the provided ID',
        });
      }
  
      return res.status(200).json({
        message: 'Record deleted successfully',
        data: deletedRecord,
      });
    } catch (error) {
      console.error('Error deleting KalawadPremvati record:', error);
      return res.status(500).json({
        message: 'Server error while deleting record',
      });
    }
  };

export default {saveImage, assignFeedback, getFeedbacks, getFeedbacksByRole, createFeedback, deleteFeedback}
