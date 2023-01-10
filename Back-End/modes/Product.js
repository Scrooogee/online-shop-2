import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        sizes: {
            type: Array,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model('Product', ProductSchema)