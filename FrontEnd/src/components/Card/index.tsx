import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { CartItemsProps } from '../CartItem';
import { addCartItems } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { Data, UserData } from '../../redux/slices/authSlice';

export type CardProps = {
    _id: string,
    title: string,
    imageUrl: string,
    price: number,
    sizes: number[],
    category: string,
}

const Card: React.FC<CardProps> = ({_id, title, imageUrl, price, sizes, category}) => {

    const data: any  = useSelector((state: RootState) => state.authSlice.data)
    
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [sizeItem, setSizeItem] = React.useState(sizes[0])

    const onClickAdd = () => {
        const item : CartItemsProps = {
            _id,
            title,
            imageUrl,
            price,
            category,
            size: sizeItem,
            count: 0,
            user: data?.userData,
        };
        dispatch(addCartItems(item))
    }

    const token = window.localStorage.getItem('token')
    const gotoAuth = () => {
        navigate('/auth')
    }
    return(
        <div className="item-block">
            <img onClick={() => navigate(`product/${_id}`)}  className="item-block--image" src={imageUrl && imageUrl.includes('upload') ? `http://localhost:4000/${imageUrl}` : imageUrl} alt="item"></img>
            <h4 onClick={() => navigate(`product/${_id}`)}  className="item-block--title">{title}</h4>
            <div className="item-block--selector">
                <ul>
                   {sizes.map((size, index) => (
                        <li 
                        className={sizeItem === size ? 'active' : ''}
                        onClick={() => setSizeItem(size)}
                        key={`${size}--${index}`}
                        >{size}</li>
                    ))}
                </ul>
            </div>
            <div className="item-block--bottom">
                <div className="item-block--price">$ {price}</div>
                <button onClick={token ? onClickAdd : gotoAuth} className="button button--outline button--add">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white"></path>
                    </svg>
                    <span>Add</span>
                </button>
            </div>
        </div> 
    )
}

export default Card;