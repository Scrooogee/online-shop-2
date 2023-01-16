import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { setCategorieId , selectCategory} from '../redux/slices/filterSlice';
import {selectGood} from '../redux/slices/goodsSlice'

interface CategoryProps {
    catigoriesItem: string[]
}

const Categories: React.FC<CategoryProps> = ({catigoriesItem}) => {
    const dispatch = useDispatch()

    const {items} = useSelector(selectGood)
    const category = useSelector(selectCategory)
    


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
