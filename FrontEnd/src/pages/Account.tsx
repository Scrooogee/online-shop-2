import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAuthMe, Data } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';



const Account: React.FC = () => {
    const data: Data | null = useSelector((state: RootState) => state.authSlice.data)
    const status = useSelector((state: RootState) => state.authSlice.status)
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    console.log(data)
    const {id} = useParams()

    React.useEffect(() => {
        // dispatch(fetchAuthMe())
    }, [])

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
                
                <p>Address: {data.userData?.address}</p>
                <button onClick={LogOut} className='button button--black'>
                    Logout
                </button>
            </div>
            <div className="user-orders">
                <h1>{data.userData?.isAdmin ? 'Orders' : 'My orders'}</h1>
                <div></div>
            </div>
        </div>}
        </>
    )
};

export default Account;