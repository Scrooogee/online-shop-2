import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator';

import UserModel from "../modes/User.js";


export const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().exec()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to find orders'
        })
    }
};

export const Register = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            lastName: req.body.lastName,
            phone: req.body.phone,
            address: req.body.address,
            passwordHash: hash
        })

        

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretToken',
            {
                expiresIn: '30d'
            }
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({userData, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to register user'
        })
    }
}

export const Login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if(!user) {
            return res.status(404).json({
                message: 'Login or password is incorrect'
            })
        };

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Login or password is incorrect'
            })
        };

        const token = jwt.sign(
            {
                _id: user._id
            },

            'secretToken',
            {
                expiresIn: "30d"
            }
        );

        const {passwordHash, ...userData} = user._doc

        res.json({userData, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to login'
        })
    }
};

export const AuthMe = async (req, res) => {
    try {

        const user = await UserModel.findById(req.userId)

        if (!user) {
            res.status(404).json({
                message: 'Error 404'
            })
        }
        
        const {passwordHash, ...userData} = user._doc;

        res.json({userData})
    } catch (error) {
        res.status(404).json({
            message: 'Error 404'
        })
    }
};