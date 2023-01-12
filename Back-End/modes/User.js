import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        orders: {
            type: Array,
            default: []
        }
    }
);


export default mongoose.model('User', UserSchema);