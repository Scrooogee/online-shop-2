import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAdminGoods, selectGood } from '../../redux/slices/goodsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { CardProps } from '../Card';

import AdminGoods from './AdminGoods';
import AdminOrders from './AdminOrders';

const AdminPanel: React.FC = () => {

    const [nav, setNav] = useState('Orders')
    const adminNav = ['Orders', 'Goods']

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchAdminGoods())
    }, [])


    return (
        <>
            {adminNav.map(item => (
                <span 
                key={item}
                className={`panel-title admin ${item === nav  && 'active'}`}
                onClick={() => setNav(item)}
                >{item}</span>
            ))}
            <div className='panel-content'>
                {nav === 'Orders' ?  <AdminOrders/> : <AdminGoods />}
            </div>
        </>
    )
};

export default AdminPanel;