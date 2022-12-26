import React from 'react'
import { HomeContext } from '../pages/Home';

function Categories() {

    const {categories, setCategories} = React.useContext(HomeContext)

    const categoriesItem = ['All', 'Casual', 'Sport', 'Canvas', 'Skate'];

    return (
        <div className="categories">
            <ul>
                {categoriesItem.map((name, index) => ( 
                    <li 
                    key={`${name}__${index}`}  
                    className={categories === index ? 'active' : ''} 
                    onClick={() => setCategories(index)}>{name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Categories;