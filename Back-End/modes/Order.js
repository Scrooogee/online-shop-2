import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        count: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    },
)

export default mongoose.model('Order', OrderSchema)