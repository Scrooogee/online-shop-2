import React,  {Suspense} from 'react'
import './scss/app.scss'
import Home from './pages/Home';
import MainLayloat from './components/MainLayloat';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useAppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/authSlice';


const Cart = React.lazy(() => import( /* webpackChunkName: 'Cart'*/ './pages/Cart'));
const ProductPage = React.lazy(() => import( /* webpackChunkName: 'ProductPage'*/ './pages/ProductPage'));
const NotFound = React.lazy(() => import( /* webpackChunkName: 'NotFound'*/ './pages/NotFound'));
const Auth = React.lazy(() => import(/* webpackChunkName: 'Auth' */ './pages/Auth'))
const Account = React.lazy(() => import (/* webpackChunkName: 'Account' */ './pages/Account'))
const AdminGoods = React.lazy(() => import(/* webpackChunkName: 'AdminGoods' */ './components/AdminPanel/AdminGoods'))
const AdminOrders = React.lazy(() => import(/* webpackChunkName: 'AdminGoods' */ './components/AdminPanel/AdminOrders'))

const App: React.FC = () =>  {

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])



    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayloat/>}>
                    <Route path='' element={<Home/>} />
                    <Route path='cart' element={
                        <Suspense>
                            <Cart/>
                        </Suspense>
                    } />
                    <Route path='product/:id' element={
                        <Suspense>
                            <ProductPage/>
                        </Suspense>
                    } />
                    <Route path='auth' element={
                        <Suspense>
                            <Auth/>
                        </Suspense>
                    } />
                    <Route path='account/:id' element={
                        <Suspense>
                            <Account/>
                        </Suspense>
                    } />
                    <Route path='*' element={
                        <Suspense>
                            <NotFound/>
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </Router>
    );

};

export default App;
