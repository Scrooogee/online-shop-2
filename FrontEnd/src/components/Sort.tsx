import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, selectSortType, SortType } from '../redux/slices/filterSlice';

type SortClick = MouseEvent & {
    path: Node[]
}

const sortItems: SortType[] = [
    {name: 'new ↓', property: 'new'}, 
    {name: 'old ↑', property: '-old'}, 
    {name: 'price ↓', property: 'price'}, 
    {name: 'price ↑', property: '-price'},
]


const Sort: React.FC = () => {

    const dispatch = useDispatch()

    const sortType = useSelector(selectSortType);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const [openSort, setOpenSort] = React.useState(false)

    const onCLkickSortItem = (obj: SortType) => {
        dispatch(setSort(obj))
        setOpenSort(false)
    }

    React.useEffect(() => {
        const handlClickOutside = (event: MouseEvent) => {

            const _event = event as SortClick;

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setOpenSort(false)
            } 
        };
        document.body.addEventListener('click', handlClickOutside)

        return () => document.body.removeEventListener('click', handlClickOutside);
    }, [])
    
    return(
        <div ref={sortRef} className="sort">
            <div onClick={() => setOpenSort(!openSort)} className="sort--label">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"></path>
                </svg>
                <b>Sort by:</b>
                <span>{sortType.name}</span>
            </div>
            {openSort && 
                <div className='sort--popup'>
                    <ul>
                        {sortItems.map((obj: SortType, index: number) => (
                            <li
                            key={`${obj.name}--${index}`}
                            onClick={() => onCLkickSortItem(obj)}
                            className={sortType.name === obj.name ? "active" : ''}>{obj.name}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
};

export default Sort;