import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { setCategorieId , selectCategory} from '../redux/slices/filterSlice';

const Categories: React.FC = () => {
    const dispatch = useDispatch()

    const categoryId = useSelector(selectCategory)

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