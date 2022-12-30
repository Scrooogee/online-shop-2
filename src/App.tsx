import React from 'react'
import './scss/app.scss'
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import MainLayloat from './components/MainLayloat';
import ProductPage from './pages/ProductPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () =>  {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayloat/>}>
                    <Route path='' element={<Home/>} />
                    <Route path='cart' element={<Cart/>} />
                    <Route path='product/:id' element={<ProductPage/>} />
                    <Route path='*' element={<NotFound/>} />
                </Route>
            </Routes>
        </Router>
    );

}

export default App;
