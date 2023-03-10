import ProductModel from "../modes/Product.js";

export const GetAll = async (req, res) => {

    const {category, sortDeskBy, sortAskBy} = req.query
    try {
        const products = await ProductModel.find().exec()
        let product = [];

        if(product && sortDeskBy === 'new') {
            product = products.sort((oldProd, newProd) => newProd.createdAt - oldProd.createdAt)
        }

        if(product && sortAskBy === 'old') {
            product = products.sort((oldProd, newProd) => oldProd.createdAt - newProd.createdAt)
        }

        if(product && sortDeskBy === 'price') {
            product = products.sort((min, max) => +max.price - +min.price)
        }

        if( product && sortAskBy === 'price') {
            product = products.sort((min, max) => +min.price - +max.price)
        }

        

        if (product && category) {
            product = product.filter(item => item.category.toLowerCase() === category.toLowerCase())
        }
        


        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to found the products'
        })
    }
};

export const GetAllAdminPannel = async (req, res) => {

    try {
        const products = await ProductModel.find().exec()
        res.json(products.sort((oldProd, newProd) => newProd.createdAt - oldProd.createdAt))
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
            category: req.body.category,
            imageUrl: req.body.imageUrl
        })

        const product = await doc.save()

        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to add the products'
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

export const Update = async (req, res) => {
    try {

        const {id} = req.params

        await ProductModel.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                title: req.body.title,
                sizes: req.body.sizes.split(','),
                price: req.body.price,
                category: req.body.category,
                imageUrl: req.body.imageUrl
            }
        );

        res.json({
            succes: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Coudn\'t update the post'
        })
    }
};