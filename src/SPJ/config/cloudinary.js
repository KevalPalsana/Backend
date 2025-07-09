import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dn1jdxyoq',
    api_key: '473929521514886',
    api_secret: 'uP9otJbLmG0n0x8-2bdY_A74ckI',
  });
  

export default cloudinary;
