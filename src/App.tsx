import React,  {Suspense} from 'react'
import './scss/app.scss'
import Home from './pages/Home';
import MainLayloat from './components/MainLayloat';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


const Cart = React.lazy(() => import( /* webpackChunkName: 'Cart'*/ './pages/Cart'));
const ProductPage = React.lazy(() => import( /* webpackChunkName: 'ProductPage'*/ './pages/ProductPage'));
const NotFound = React.lazy(() => import( /* webpackChunkName: 'NotFound'*/ './pages/NotFound'));

const App: React.FC = () =>  {

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
                    <Route path='*' element={
                        <Suspense>
                            <NotFound/>
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </Router>
    );

}

export default App;
