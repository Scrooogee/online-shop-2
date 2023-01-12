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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to found the products'
        })
    }
};

export const GetOne = async (req, res) => {
    try {
        const {id} = req.params

        ProductModel.findByIdAndUpdate(
            {
            _id: id
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'Couldn\'t to found the product'
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        massage: 'Couldn\'t to found the product'
                    })
                }

                res.json(doc)
            }
        ).populate('')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Couldn\'t to found the post'
        })
    }
};

export const ImageUpload = (req, res) => {
    try {
        res.json(req.file.path)
    } catch (error) {
        console.log(error)
    }

}

export const Remove = async (req, res) => {
    try {
        const {id} = req.params

        ProductModel.findByIdAndDelete(
            {
                _id: id,
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                res.json({
                    succes: true,
                })
            }
        )


    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Couldn\'t to found the post'
        })
    }
};