import React from 'react';
import { HomeContext } from '../pages/Home';


function Pagination(){

    const {pageItem, setPageItem} = React.useContext(HomeContext)

    const pages = [1, 2, 3]

    const setPrevPage = () => {
        if (pageItem > 1) {
            setPageItem(pageItem - 1)
        }
    }

    const setNextPage = () => {
        if (pageItem < pages.length) {
            setPageItem(pageItem + 1)
        }
    }

    return (
        <div className="paginator">
            <button onClick={setPrevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"/></svg>
            </button>
            {pages.map((page, index) => (
            <button 
            key={index}
            onClick={() => setPageItem(page)}
            >{page}</button>
            ))}
            <button onClick={setNextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"/></svg>
            </button>
        </div>
    )
};

export default Pagination