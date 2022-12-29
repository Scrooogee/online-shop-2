import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { setPage, selectPage} from '../redux/slices/filterSlice'


const Pagination: React.FC = () => {

    const dispatch = useDispatch()

    const pageItem = useSelector(selectPage)


    const pages = [1, 2, 3]

    const setPrevPage = () => {
        if (pageItem > 1) {
            dispatch(setPage(pageItem - 1))
        }
    }

    const setNextPage = () => {
        if (pageItem < pages.length) {
            dispatch(setPage(pageItem + 1))
        }
    }

    return (
        <div className="paginator">
            <button onClick={setPrevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"/></svg>
            </button>
            {pages.map((page, index) => (
            <button 
            className={pageItem === page ? 'button_active' : ''}
            key={index}
            onClick={() => dispatch(setPage(page))}
            >{page}</button>
            ))}
            <button onClick={setNextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"/></svg>
            </button>
        </div>
    )
};

export default Pagination