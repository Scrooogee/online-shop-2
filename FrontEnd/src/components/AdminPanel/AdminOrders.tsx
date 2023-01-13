import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { fetchOrders, fetchRemoveOrder, SelectOrders } from '../../redux/slices/OrdersSlice';
import { useAppDispatch } from '../../redux/store';


const AdminOrders: React.FC = () => {

    

    const {items, status} = useSelector(SelectOrders)
    const isLoading = status === 'loading';

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    const removeOrder = (id: string) => {
        if(window.confirm('Do you want to delete te order?')){
             dispatch(fetchRemoveOrder(id))
        }
     }
    

    return (
        <div className='goods orders'>
            {isLoading ? [...Array(5)].map(item => (

                <ContentLoader
                className='goods--skeleton'
                speed={2}
                height={111}
                viewBox="0 0 476 111"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="16" ry="16"  height="111" />
            </ContentLoader>

            )) 
            : 
            items.map((item) => (
                <div className='orders--item'>
                    <div className="goods--item">
                        <img src={item.imageUrl && item.imageUrl.includes('upload') ? `http://localhost:4000/${item.imageUrl}` : item.imageUrl}  alt="" />
                        <div className="info"> 
                            <h3>{item.title}</h3>
                            <p>$ {item.price}</p>
                        </div>
                        <div className="sizes">
                            <p>Size</p>
                            {item.size}
                        </div>
                        <div className="category"> 
                            <p>Category</p>
                            <span>{item.category}</span>
                        </div>
                        <div className="buttons">
                        <span onClick={() => removeOrder(item._id)}>
                            <svg width={20}  viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#ff4013">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fillRule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z" fill="#e32400" fillRule="nonzero"></path> </g> </g>
                            </svg>
                        </span>
                    </div>
                    </div>
                    <h3>User info:</h3>
                    <div className='customer-info'>
                        
                        <div>
                            <p>Full name:
                                <span>{item.user.name}</span>
                                <span>{item.user.lastName}</span>
                            </p>
                            <p>Addres: <span>{item.user.address}</span></p>
                        </div>
                        <div>
                            <p>Phone: <span>{item.user.phone}</span></p>
                            <p>E-mail: <span>{item.user.email}</span></p>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )
};

export default AdminOrders;