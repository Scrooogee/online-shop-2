import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SelectAuth } from '../../redux/slices/authSlice';
import { fetchUsersOrders, SelectOrders } from '../../redux/slices/OrdersSlice';
import { useAppDispatch } from '../../redux/store';

const UserPanel: React.FC = () => {


    const {items, status} = useSelector(SelectOrders)
    const isLoading = status === 'loading';

    const dispatch = useAppDispatch()
    const {id} = useParams()

    React.useEffect(() => {
        dispatch(fetchUsersOrders(id))
    }, [])

    return (
        <><h1>My Orders</h1>
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
                    </div>
                </div>
            ))}
        </div>
        </>
    )
};

export default UserPanel;