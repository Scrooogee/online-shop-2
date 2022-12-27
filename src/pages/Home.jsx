import React from 'react'

import axios from 'axios';
import { useSelector } from 'react-redux';



import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';


export const HomeContext = React.createContext()


function Home() {

    const {categoryId, sortType} = useSelector(state => state.filterSlice);
    const pageItem = useSelector(state => state.filterSlice.pageItem);

    const [allItems, setAllItems] = React.useState([]);
    const [loadinSkeleton, setLoadingSkeleton] = React.useState(true);


    React.useEffect(() => {

        const order = sortType.property.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.property.replace('-', '');
        const categorie = categoryId > 0 ? `category=${categoryId}` : '';
        const pages = `&page=${pageItem}&limit=8`

        async function fetchData() {
            setLoadingSkeleton(true)

            const itemsRespons = await axios.get(`https://637c4a6372f3ce38ea9edc01.mockapi.io/Items?${categorie}${pages}&sortBy=${sortBy}&order=${order}`);
            
            setAllItems(itemsRespons.data)
            setLoadingSkeleton(false)
        }
        fetchData()

        window.scrollTo(0, 0)
        
    }, [categoryId, sortType, pageItem])


    return (
        <>
            <HomeContext.Provider>
                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>
                <h2 className="content__title">All sneakers</h2>
                <div className="content__items">
                {loadinSkeleton ? [...new Array(12)].map((_, index)=> (<Skeleton key={index}/>)) : allItems.map((item, index) => ( 
                        <Card 
                        key={`${item.title}__${index}`}
                        {...item}/>
                    ))}
                </div>
                <Pagination/>
            </HomeContext.Provider>
        </>
    )
};

export default Home;