import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { setCategorieId , selectCategory} from '../redux/slices/filterSlice';
import {selectGood} from '../redux/slices/goodsSlice'

const Categories: React.FC = () => {
    const dispatch = useDispatch()
    
    const {items} = useSelector(selectGood)
    const category = useSelector(selectCategory)

    const categoriesItem = items.reduce((acc, item) => acc.includes(item.category) ? acc: acc =`${acc}, ${item.category}`, 'All').split(',');
    // const all = categoriesItem.unshift('All')

    console.log(categoriesItem)

    return (
        <div className="categories">
            <ul>
                {categoriesItem.map((name, index) => ( 
                    <li 
                    key={`${name}--${index}`}  
                    className={category === name ? 'active' : ''} 
                    onClick={() => dispatch(setCategorieId(name))}>{name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Categories;
