import React from 'react'
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filterSlice';
import { selectCaregoryItems, selectGood } from '../redux/slices/goodsSlice';
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
    const categoryItems = useSelector(selectCaregoryItems)


    
    const PageArg = 4;

    const pages: number[] = [];

    for(let i = 1; i <= Math.ceil(items.length / PageArg); i++) {
        pages.push(i)
    }

    React.useEffect(() => {

        async function fetchData() {

            const order = sortType.property.includes('-') ? 'sortAskBy' : 'sortDeskBy';
            const sortBy = sortType.property.replace('-', '');
            const category = categoryId !== 'All' ? `category=${categoryId}&` : '';

            await dispatch(
                fetchGoods(
                    {
                        order,
                        sortBy,
                        category: category.replaceAll(' ', ''),
                    }
            ))

        }
        fetchData()
        
        
    }, [categoryId, sortType, pageItem])


    const lastItemIndex = pageItem * PageArg;
    const firstItemIndex = lastItemIndex - PageArg;
    const currentItemPage = items.slice(firstItemIndex, lastItemIndex)


    return (
        <> 
            <div className='home-img'>
                <h1>Best Sneakers</h1>
            </div>
            <div id='top' className="content--top">
                <Categories 
                catigoriesItem={categoryItems}/>
                <Sort/>
            </div>
            <h2 className="content--title">All sneakers</h2>
            <div className="content--items">
            {status === 'loading' ? [...new Array(12)].map((_, index)=> (<Skeleton key={index}/>)) 
            : 
            currentItemPage.map((item: CardProps, index: number) => ( 
                    <Card 
                    key={`${item.title}--${index}`}
                    {...item}/>
                ))}
            </div>
            <Pagination pages={pages}/>
        </>
    )
};

export default Home;