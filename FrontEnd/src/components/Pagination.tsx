import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { setPage, selectPage} from '../redux/slices/filterSlice'
import { selectGood } from '../redux/slices/goodsSlice';


const Pagination: React.FC = () => {

    const dispatch = useDispatch()

    const pageItem = useSelector(selectPage)

    const {items} = useSelector(selectGood)
    const arg = 8;

    const pages: number[] = [];

    for(let i = 1; i <= Math.ceil(items.length / arg); i++) {
        pages.push(i)
    }

    const setPrevPage = () => {
        if (pageItem > 1) {
            dispatch(setPage(pageItem - 1))
            window.scrollTo({top: 850});
        }
    }

    const setNextPage = () => {
        if (pageItem < pages.length) {
            dispatch(setPage(pageItem + 1))
            window.scrollTo({top: 850});
        }
    }

    const setPageNumber = (page: number) => {
        dispatch(setPage(page))
        window.scrollTo({top: 850});
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
            onClick={() => setPageNumber(page)}
            >{page}</button>
            ))}
            <button onClick={setNextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"/></svg>
            </button>
        </div>
    )
};

export default Pagination