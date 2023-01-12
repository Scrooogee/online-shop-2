import React from 'react'
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filterSlice';
import { fetchAdminGoods, selectGood } from '../redux/slices/goodsSlice';
import { useAppDispatch } from '../redux/store';


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';


import { fetchGoods } from '../redux/slices/goodsSlice';
import { CardProps } from '../components/Card';


const Home: React.FC = () => {


    const dispatch = useAppDispatch();

    const {categoryId, sortType, pageItem} = useSelector(selectFilter);
    const {items, status} = useSelector(selectGood)

    React.useEffect(() => {

        async function fetchData() {

            const order = sortType.property.includes('-') ? 'asc' : 'desc';
            const sortBy = sortType.property.replace('-', '');
            const categorie = categoryId > 0 ? `category=${categoryId}` : '';
            const pages = `&page=${pageItem}&limit=8`

            dispatch(
                fetchGoods(
                    {
                order,
                sortBy,
                categorie,
                pages
            }
            ))

        }
        fetchData()

        
    }, [categoryId, sortType, pageItem])


    return (
        <> 
            <div className='home-img'>
                <h1>Best Sneakers</h1>
            </div>
            <div id='top' className="content--top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content--title">All sneakers</h2>
            <div className="content--items">
            {status === 'loading' ? [...new Array(12)].map((_, index)=> (<Skeleton key={index}/>)) 
            : 
            items.map((item: CardProps, index: number) => ( 
                    <Card 
                    key={`${item.title}--${index}`}
                    {...item}/>
                ))}
            </div>
            <Pagination />
        </>
    )
};

export default Home;