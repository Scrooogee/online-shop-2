import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const AppContext = React.createContext()

function App() {

    return (
        <AppContext.Provider>
            <Router>
                <div className="wrapper">
                    <Header/>
                    <div className="content">
                        <div className="container">
                        <Routes>
                            <Route path='/' element={<Home/>} />
                            <Route path='/cart' element={<Cart/>} />
                            <Route path='*' element={<NotFound/>} />
                        </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </AppContext.Provider>
    );

}

export default App;
