import mongoose from 'mongoose';

const splachScreenSchema = new mongoose.Schema ({
    splashImage: {
        type: String,
        required: true,
    },
},{timestamps: true});

const SplashScreenImage = mongoose.model("SplashScreenImage", splachScreenSchema);

export default SplashScreenImage;