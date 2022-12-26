import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Pagination from '../components/Pagination';
import axios from 'axios';

export const HomeContext = React.createContext()


function Home() {

    const [allItems, setAllItems] = React.useState([])
    const [loadinSkeleton, setLoadingSkeleton] = React.useState(true)
    const [categories, setCategories] = React.useState(0)
    const [sortItemStatus, setSortItemStatus] = React.useState({name: 'popular ↓', property: 'rating'})
    const [pageItem, setPageItem] = React.useState(1)

    React.useEffect(() => {

        const order = sortItemStatus.property.includes('-') ? 'asc' : 'desc';
        const sortBy = sortItemStatus.property.replace('-', '');
        const categorie = categories > 0 ? `category=${categories}` : '';
        const pages = `&page=${pageItem}&limit=8`

        async function fetchData() {
            setLoadingSkeleton(true)

            const itemsRespons = await axios.get(`https://637c4a6372f3ce38ea9edc01.mockapi.io/Items?${categorie}${pages}&sortBy=${sortBy}&order=${order}`);
            
            
            setAllItems(itemsRespons.data)
            setLoadingSkeleton(false)
        }
        fetchData()

        window.scrollTo(0, 0)
        
      }, [categories, sortItemStatus, pageItem])


    return (
        <>
            <HomeContext.Provider value={{categories, setCategories, sortItemStatus, setSortItemStatus, pageItem, setPageItem}}>
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