import { body } from "express-validator";

export const ProductValidator = [
    body('title', 'This field should not be empty.').isLength({min: 3}).isString(),
    body('sizes', 'This field should not be empty.').isArray(),
    body('price', 'This field should not be empty.').isString(),
    body('imageUrl', 'This field should not be empty.').isURL()
];

export const registerValidator = [
    body('email', 'email is not correct').isEmail(),
    body('password', 'password should be min 5 symbols').isLength({min: 5}),
    body('name', 'Name should be min 3 symbols').isLength({min: 3}).isString(),
    body('lastName', 'Last name should be min 3 symbols').isLength({min: 3}).isString(),
    body('lastName', 'This field should not be empty.').isLength({min: 3}).isString(),
];