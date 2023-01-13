import OrderModel from "../modes/Order.js";
import UserModel from "../modes/User.js";

export const  GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('user').exec()
        res.json(orders.sort((oldOrder, newOrder) => newOrder.createdAt - oldOrder.createdAt))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to find orders'
        })
    }
};


export const CreateOrder = async (req, res) => {
    
    try {

        const doc = new OrderModel({
            title: req.body.title,
            size: req.body.size,
            price: req.body.price,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            count: req.body.count
        })

        
        
        const order = await doc.save()

        // console.log(req.userId)
        await UserModel.findByIdAndUpdate(
            {
                _id: req.userId,
            },
            {
                $push: {orders: order}
            }
        );

        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to add the order'
        })
    }
};

export const RemoveOrder = async (req, res) => {
    try {
        const {id} = req.params
        
        OrderModel.findByIdAndDelete(
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

export const GetUsersOrders = async (req, res) => {
     const {id} = req.params
        
    try {
        const orders = await OrderModel.find().exec()
        res.json(orders.filter(item => item.user.toString() === id).sort((oldOrder, newOrder) => newOrder.createdAt - oldOrder.createdAt))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Faild to find orders'
        })
    }
};