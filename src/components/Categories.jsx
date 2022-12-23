import React from 'react'

function Categories() {

    const [brands, setBrands] = React.useState(0)

    const brandsItem = ['All', 'Casual', 'Sport', 'Canvas', 'Skate'];

    return (
        <div className="categories">
            <ul>
                {brandsItem.map((name, index) => ( 
                    <li 
                    key={`${name}__${index}`}  
                    className={brands === index ? 'active' : ''} 
                    onClick={() => setBrands(index)}>{name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Categories;