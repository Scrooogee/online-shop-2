import ProductModel from "../modes/Product.js";

export const GetAll = async (req, res) => {
    try {
        const products = await ProductModel.find().exec()
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to found the products'
        })
    }
};

export const Create = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            sizes: req.body.sizes.split(','),
            price: req.body.price,
            imageUrl: req.body.imageUrl
        })

        const product = await doc.save()

        res.send(product)

        console.log(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to found the products'
        })
    }
};