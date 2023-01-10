import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectCart} from '../redux/slices/cartSlice';
import { CartItemType } from '../pages/Cart';

const Header: React.FC = () => {

    const {cartItems, totalPrice} = useSelector(selectCart);
    const totalCount = cartItems.reduce((sum: number, item: CartItemType) => sum += item.count, 0);

    return(
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header--logo">
                        <img width={55} height={55} src={logo}alt="Logo"></img>
                        <div>
                        <h1>Best sneakers</h1>
                        <p>The best sneakers in the world</p>
                        </div>
                    </div>
                </Link>
                <div className='header--nav'>
                <Link to='/auth'>
                    <div className="button">
                    <svg width="24" height="24" fill="white" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                        </g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </Link>
                <Link to='/cart'>
                    <div className="button button--cart">
                        <span>$ {totalPrice}</span>
                        <div className="button--delimiter"></div>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z" stroke="white" stroke-linecap="1.8" strokeWidth="round" strokeLinejoin="round"></path>
                            <path d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z" stroke="white" stroke-linecap="1.8" strokeWidth="round" strokeLinejoin="round"></path>
                            <path d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669" stroke="white" stroke-linecap="1.8" strokeWidth="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>{totalCount}</span>
                    </div>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;

