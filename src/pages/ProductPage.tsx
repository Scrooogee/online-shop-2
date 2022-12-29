import React from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfuctPage } from '../redux/slices/productPageSlice';
import { addCartItems } from '../redux/slices/cartSlice';
import ContentLoader from "react-content-loader";
import { productPage } from '../redux/slices/productPageSlice';

const ProductPage: React.FC = () => {

    const {id} = useParams()

    const {product, status} = useSelector(productPage)
    const dispatch = useDispatch()

    const {title, imageUrl, price, sizes = []} = product

    const [sizeItem, setSizeItem] = React.useState(sizes[0])

    React.useEffect(() => {

        dispatch(
            // @ts-ignore
            fetchProfuctPage({id}))

    }, [id])

    const onClickAdd = () => {
        const item = {
            id,
            title,
            imageUrl,
            price,
            size: sizeItem
        };
        dispatch(addCartItems(item))
    }

    if (status === 'loading') {
        return (
                <ContentLoader 
                    className='product-loader'
                    speed={2}

                    height={60}
                    viewBox="0 0 210 60"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="69" y="123" rx="0" ry="0" width="0" height="1" /> 
                    <circle cx="30" cy="30" r="30" /> 
                    <circle cx="102" cy="30" r="30" /> 
                    <circle cx="175" cy="30" r="30" />
                </ContentLoader>
        )
    }

    return (
        <div className="product-page">
            {status === 'loading' ? 
            <ContentLoader 
                    className='product-loader'
                    speed={2}

                    height={60}
                    viewBox="0 0 210 60"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="69" y="123" rx="0" ry="0" width="0" height="1" /> 
                    <circle cx="30" cy="30" r="30" /> 
                    <circle cx="102" cy="30" r="30" /> 
                    <circle cx="175" cy="30" r="30" />
                </ContentLoader> 
                :
                <><div className="product-page__image">
                    <img src={imageUrl} alt="item"></img>
                </div>
                <div className='product-page__info-block'>
                    <h4 className="product-page__title">{title}</h4>
                    <div className="product-page__price">$ {price}</div>
                    <div className="product-page__selector">
                        <ul>
                        {sizes.map((size: number, index: number) => (
                                <li 
                                className={sizeItem === size ? 'active' : ''}
                                onClick={() => setSizeItem(size)}
                                key={`${size}__${index}`}
                                >{size}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="item-block__bottom">
                        <button onClick={onClickAdd} className="button button--outline button--add">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white"></path>
                            </svg>
                            <span>Add</span>
                        </button>
                    </div>
                </div></>}
        </div>
    )
};

export default ProductPage;