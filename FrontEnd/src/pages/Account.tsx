import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAuthMe, Data } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';


import AdminPanel from '../components/AdminPanel';
import UserPanel from '../components/UserPanel';
import { fetchAdminGoods } from '../redux/slices/goodsSlice';



const Account: React.FC = () => {
    const data: Data | null = useSelector((state: RootState) => state.authSlice.data)
    const status = useSelector((state: RootState) => state.authSlice.status)

    const navigate = useNavigate()
    const {id} = useParams()

    const LogOut = () => {
        window.localStorage.removeItem('token');
        (() => navigate('/auth'))()
    }


    if (!data || id !== data.userData?._id) {
        (() => navigate('/auth'))()
    }

    if (status === 'loading') {
        return <>loading</>
    }
    

    

    return (
        <>
        {status === 'succes' && data && <div className='account'>
            <div className="user-info">
                <h2>
                    <span>{data.userData?.name}</span>
                    <span> {data.userData?.lastName}</span>
                </h2>
                <p className='admin'>{data.userData?.isAdmin ? 'Admin': 'Customer'}</p>
                <p>Address: <i>{data.userData?.address}</i></p>
                <p>Email: <i>{data.userData?.email}</i></p>
                <p>Phone: <i>{data.userData?.phone}</i></p>
                <button onClick={LogOut} className='button button--black'>
                    Logout
                </button>
            </div>
            <div className="panel">
                {!data.userData?.isAdmin ? <UserPanel/> : <AdminPanel/>}
            </div>
        </div>}
        </>
    )
};

export default Account;