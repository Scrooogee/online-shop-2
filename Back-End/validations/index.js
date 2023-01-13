import { body } from "express-validator";

export const ProductValidator = [
    body('title', 'This field should not be empty.').isLength({min: 3}).isString(),
    body('sizes', 'This field should not be empty.').isArray(),
    body('imageUrl', 'This field should not be empty.').isURL(),
    body('category', 'This field should not be empty.').isString(),
];

export const registerValidator = [
    body('email', 'email is not correct').isEmail(),
    body('password', 'password should be min 5 symbols').isLength({min: 5}),
    body('name', 'Name should be min 3 symbols').isLength({min: 3}).isString(),
    body('lastName', 'Last name should be min 3 symbols').isLength({min: 3}).isString(),
    body('address', 'This field should not be empty.').isLength({min: 3}).isString(),
    body('phone', 'This field should not be empty.').isLength({min: 5}).isString()
];