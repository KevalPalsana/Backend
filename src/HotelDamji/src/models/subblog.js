import { Schema, model, Types } from 'mongoose';

const subblogSchema = new Schema({
    blogid:
    {
        type: Types.ObjectId,
        ref:'HotelBlog'
    },
    blogs:
        [
            {
                title: {
                    type: String,
                },
                images: [{
                    type: String,
                }],
                distance: {
                    type: String,
                },
                description: {
                    type: String,
                },
                active: {
                    type: Boolean,
                    default: true
                }
            }
        ],
    relatedBlogs:
        [
            {
                title: {
                    type: String
                },
                subblogid:
                {
                    type: Types.ObjectId,
                    ref: 'SubBlog'
                }
            }
        ]
}, { timestamps: true });

export const SubBlog = model("SubBlog", subblogSchema);
