import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: [
      {
        image: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const IconAboutUs = model("IconAboutUs", aboutUsSchema);
