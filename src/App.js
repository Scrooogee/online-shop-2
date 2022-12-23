import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Card from './components/Card';
import axios from 'axios'

function App() {

    const [allItems, setAllItems] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
          const itemsRespons = await axios.get('https://637c4a6372f3ce38ea9edc01.mockapi.io/Items');
          setAllItems(itemsRespons.data)
        }
        fetchData()
      }, [])




    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">All sneakers</h2>
                    <div className="content__items">
                       {allItems.map((item, index) => ( 
                            <Card 
                            key={`${item.title}__${index}`}
                            {...item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default App;
