import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { setCategorieId , selectCategory} from '../redux/slices/filterSlice';
import {selectGood} from '../redux/slices/goodsSlice'

const Categories: React.FC = () => {
    const dispatch = useDispatch()
    const [catigoriesItem, setCategory] = React.useState<string[]>([])
    const {items} = useSelector(selectGood)
    const category = useSelector(selectCategory)
    
    React.useEffect(() => {
        const categories = items.reduce((acc, item) => acc.includes(item.category) ? acc: acc =`${acc}, ${item.category}`, 'All').split(',');
        setCategory(categories)
    //     console.log(categories)
    }, [])


    return (
        <div className="categories">
            <ul>
                {catigoriesItem.map((name, index) => ( 
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
