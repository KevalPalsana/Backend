import express from 'express';
import paymentController from '../controllers/payment.js'; 
import multer from 'multer';
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/recieptImages'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage });


router.post('/payment', upload.single('recieptImage'), paymentController.createPayment);

router.get('/payment/:orderId', paymentController.getPaymentById);

router.put('/payment/:id', paymentController.updatePayment);

router.delete('/payment/:id', paymentController.deletePayment);

export default router;
