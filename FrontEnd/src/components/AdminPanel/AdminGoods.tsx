import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import ContentLoader from "react-content-loader"

import { fetchAdminGoods, fetchDelete, selectGood} from '../../redux/slices/goodsSlice';
import AddGoods from './AddGoods';
import { AddId, AddPopSelect, OpenPop } from '../../redux/slices/AddSlice';



const AdminGoods: React.FC = () => {

    const {items, status} = useSelector(selectGood)
    const isLoading = status === 'loading';


    const {state} = useSelector(AddPopSelect)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchAdminGoods())
    }, [])

    const removeItem = (id: any) => {
       if(window.confirm('Do you want to delete te product?')){
            dispatch(fetchDelete(id))
       }
    }

    const updateItem = (id: string) => {
        dispatch(OpenPop())
        dispatch(AddId(id))
    }


    return (
        <>
        <div className='goods'>
            <button onClick={() => dispatch(OpenPop())} className='goods--add'>Add+</button>
            {isLoading ? [...Array(5)].map((item, i) => (

                <ContentLoader
                key={i}
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
                <div className="goods--item">
                    <img src={item.imageUrl && item.imageUrl.includes('upload') ? `http://localhost:4000/${item.imageUrl}` : item.imageUrl}  alt="" />
                    <div className="info"> 
                        <h3>{item.title}</h3>
                        <p>$ {item.price}</p>
                    </div>
                    <div className="sizes">
                        <p>Sizes</p>
                        {item.sizes.map(item => <span
                        key={item}>{item}</span>)}
                    </div>
                    <div className="category"> 
                        <p>Category</p>
                        <span>{item.category}</span>
                    </div>

                    <div className="buttons">
                        <span onClick={() => removeItem(item._id)}>
                            <svg width={20}  viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#ff4013">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fillRule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z" fill="#e32400" fillRule="nonzero"></path> </g> </g>
                            </svg>
                        </span>
                        <span onClick={() => updateItem(item._id)}>
                            <svg width={20} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#59befe">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                <path d="M0 0h48v48H0z" fill="none"></path> 
                                <g id="Shopicon"> 
                                <path d="M44,14L34,4L4,34L3.967,44.033L14,44L44,14z M34,9.657L38.343,14l-3.622,3.622l-4.343-4.343L34,9.657z M7.98,40.02 l0.014-4.357L27.55,16.107l4.343,4.343L12.338,40.005L7.98,40.02z"></path> </g> </g>
                            </svg>
                        </span>
                    </div>
                </div>
            ))}
        </div>
        {state && <AddGoods/>}
        </>
    )
};

export default AdminGoods;