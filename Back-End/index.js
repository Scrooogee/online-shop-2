import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors"

import { checkAuth } from "./utils/index.js";
import { ProductValidator, registerValidator } from "./validations/index.js";
import { GetAll, Create, ImageUpload, GetOne, Remove } from "./controllers/ProductController.js";
import { Register, Login, AuthMe } from "./controllers/UserController.js";

mongoose.connect('mongodb+srv://admin:admin@cluster0.texvksr.mongodb.net/shop?retryWrites=true&w=majority').then(() => console.log('DB is OK')).catch((err) => console.log(err))


const app = express()



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});




app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

const upload = multer({ storage })


app.post('/auth/login', Login)
app.post('/auth/register', registerValidator, Register )
app.get('/auth/me', checkAuth, AuthMe);


app.post('/upload', checkAuth, upload.single('image'), ImageUpload);
app.get('/product', GetAll)
app.get('/product/:id', GetOne)
app.post('/product', checkAuth, ProductValidator,  Create)
app.delete('/product/:id', checkAuth, Remove)




app.listen(4000, (err) => err ? console.log(err) : console.log('Server is working'))