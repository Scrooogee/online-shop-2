import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { setCategorieId } from '../redux/slices/filterSlice';

function Categories() {
    const dispatch = useDispatch()

    const categoryId = useSelector(state => state.filterSlice.categoryId)

    const categoriesItem = ['All', 'Casual', 'Sport', 'Canvas', 'Skate'];

    return (
        <div className="categories">
            <ul>
                {categoriesItem.map((name, index) => ( 
                    <li 
                    key={`${name}__${index}`}  
                    className={categoryId === index ? 'active' : ''} 
                    onClick={() => dispatch(setCategorieId(index))}>{name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Categories;